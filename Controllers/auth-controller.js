// controller : a part of your code that is responsible for handling the applications logic.used to process incoming requests (comes from routers), interact with models(data sources), and send response back to the clients.
const User = require("../models/user_model");
const bcrypt = require("bcrypt");

const home = async (req, res) => {
  try {
    res.status(200).json("welcome to mern stack!");
  } catch (error) {
    console.log(error);
  }
};

/* steps to get the reg data in db.
1.get reg data (username,email,pass)
2.check if email already exists.
3.Hash password
4.create user
5.save to db
6.respond
*/
const reg = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    // to check if email exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "email alredy exists." });
    }

    // const saltRound = 10;
    // const hash_pass = await bcrypt.hash(password, saltRound);

    const userCreate = await User.create({
      username,
      email,
      phone,
      password,
    });

    const token = await userCreate.generateToken();

    res.status(200).json({
      message: "registration succesful",
      token,
      userId: userCreate._id.toString(),
    });
  } catch (error) {
    //res.status(500).json("internal server error");
    next(error);
  }
};

// login logic
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json("invalid informations");
    }
    //const isPassValid = await bcrypt.compare(password, userExists.password);
    const isPassValid = await userExists.comparePass(password);

    const token = await userExists.generateToken();
    if (isPassValid) {
      res.status(200).json({
        message: "Login successful",
        token,
        userId: userExists._id.toString(),
      });
    } else {
      res.status(401).json({ message: "invalid information" });
    }
  } catch (error) {
    //res.status(500).json("internal server error");
    next(error);
  }
};

// to send user data in frontend

const user = async (req, res) => {
  try {
    //userData is from auth_middleware;
    const userData = req.user;
    //console.log(userData);

    return res.status(200).json({ userData });

    //res.status(200).json({msg:"this is user"});
  } catch (error) {
    console.error("error from user",error);
  }
};

module.exports = { home, reg, login, user };
