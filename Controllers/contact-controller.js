const Contact = require("../models/contact_model");

const contactForm = async (req, res) => {
  try {
    const { username, email, message } = req.body;
    await Contact.create({ username, email, message });
    return res.status(200).json({ message: "message send successfully" });
  } catch (error) {
    res.status(500).json({ message: "message not send " });
  }
};

module.exports = contactForm;
