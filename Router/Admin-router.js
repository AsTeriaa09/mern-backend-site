const express = require("express");
const AdminRouter = express.Router();
const AdminController = require("../Controllers/admin-controller");
const authMiddleware = require("../middleware/auth_middleware");
const adminMiddleWare = require("../middleware/admin_middleware");

// authmiddleware checks if the user is logged in/if the token is verified. adminmiddleware is checking if the logged in user is an admin or not
AdminRouter.route("/users").get(
  authMiddleware,
  adminMiddleWare,
  AdminController.AllUserData
);
AdminRouter.route("/users/:id").get(
  authMiddleware,
  adminMiddleWare,
  AdminController.GetUserById
);
AdminRouter.route("/users/update/:id").patch(
  authMiddleware,
  adminMiddleWare,
  AdminController.UpdateUserById
);
AdminRouter.route("/users/delete/:id").delete(
  authMiddleware,
  adminMiddleWare,
  AdminController.DeleteUserById
);
AdminRouter.route("/contacts/delete/:id").delete(
  authMiddleware,
  adminMiddleWare,
  AdminController.DeleteContactById
);

AdminRouter.route("/contacts").get(
  authMiddleware,
  adminMiddleWare,
  AdminController.AllContacts
);

module.exports = AdminRouter;
