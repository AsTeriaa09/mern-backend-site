const Services = require("../models/service_model");

const Service = async (req, res) => {
  try {
    const response = await Services.find();
    if (!response) {
      return res.status(404).json({ msg: "response data not found!" });
    }
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error!" });
  }
};

module.exports = Service;
