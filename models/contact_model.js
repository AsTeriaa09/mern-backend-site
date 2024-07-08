const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const contactSchema = new mongoose.Schema({
  username: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  message: {
    type: "string",
    required: true,
  },
});

//define the model/collection name
const Contact = new mongoose.model("Contact", contactSchema);

module.exports = Contact;
