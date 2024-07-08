const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  phone: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// to secure pass
userSchema.pre("save", async function (next) {
  const user = this; //this = all the info of the user

  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(user.password, saltRound);
    user.password = hash_pass;
    next();
  } catch (error) {
    next(error);
  }
});

// JWT-stored on the client side (cookies/local etc)
//methods - helps the function to be used anywhere
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_KEY, //signature
      {
        expiresIn: "60d",
      }
    );
    
  } catch (error) {
    console.error(error);
  }
};

//pass compare logic for login
userSchema.methods.comparePass = async function (password) {
  try {
    return bcrypt.compare(password, this.password);
  } catch (error) {
    console.error(error);
  }
};

//define the model/collection name
const User = new mongoose.model("User", userSchema);

module.exports = User;
