const jwt = require("jsonwebtoken");
const User = require("../models/user_model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ msg: "unauthorized http, token not provided" });
  }

  //assuming token is in the format "Brearer token" . to remove this format,
  const jwtToken = token.replace("Bearer", "").trim();
  //console.log("auth middleware : ", jwtToken);

  //to verify token,
  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_KEY);

    const userData = await User.findOne({ email: isVerified.email })
    // .select({
    //   password: 0,
    // });

    //console.log(userData);
    req.user = userData;
    req.token = token;
    req.userId = userData._id;

    next();
  } catch (error) {
    return res.status(401).json({ msg: "unauthorized token" });
    //console.log(error);
  }
};

module.exports = authMiddleware;
