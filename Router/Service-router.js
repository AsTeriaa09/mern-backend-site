const express = require("express");
const ServiceRouter = express.Router();
const Service = require("../Controllers/service-controller")

ServiceRouter.route("/service").get(Service);

module.exports = ServiceRouter;