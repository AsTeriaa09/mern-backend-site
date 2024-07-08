const express = require("express");
const router = express.Router();
const contactForm = require("../Controllers/contact-controller");
const validate = require("../middleware/validation_middleware");
const contactValidationSchema = require("../validation/contact_validation");

router.route("/contact").post(validate(contactValidationSchema), contactForm);

module.exports = router;
