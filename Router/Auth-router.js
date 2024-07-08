// in express js, express.Router() is a mini express application without all the server configurations but with all the ability to define routes, middlewares and even have its own set of handellers.

const express = require("express");
const router = express.Router();
const AuthControllers = require("../Controllers/auth-controller");
const validate = require("../middleware/validation_middleware");
const { signUpSchema, LoginSchema } = require("../validation/auth_validation");
const authMiddleware = require("../middleware/auth_middleware");

// 1st way
//  app.get("/", (req, res) => {
//   res.status(200).send("welcome to mern stack aster!");
// });

// 2nd way
//  router.get("/", (req,res)=>{
//     res.status(200).send("welcome to mern stack!");
//  });
//  3rd way
// router.route("/").get((req, res) => {
//   res.status(200).send("welcome to mern stack!");
// });
// router.route("/reg").get((req, res) => {
//     res.status(200).send("welcome to reg!");
//   });

router.route("/").get(AuthControllers.home);
router.route("/reg").post(validate(signUpSchema), AuthControllers.reg);
router.route("/login").post(validate(LoginSchema), AuthControllers.login);

router.route("/user").get(authMiddleware, AuthControllers.user);

module.exports = router;
