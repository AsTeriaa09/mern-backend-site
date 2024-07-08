const User = require("../models/user_model");
const Contact = require("../models/contact_model")

const AllUserData = async (req, res) => {
  try {
    const users = await User.find().select({ password: 0 });
    if (!users || users.length === 0) {
      res.status(404).json({ msg: "no users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: "error getting data" });
  }
};

const AllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      res.status(404).json({ msg: "no contacts found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ msg: "error getting data" });
  }
};

// to delete user
const DeleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const DeleteUser = await User.deleteOne({ _id: id });
    return res.status(200).json({ msg: "User deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

// to delete contact
const DeleteContactById = async (req, res) => {
  try {
    const id = req.params.id;
    const DeleteUser = await Contact.deleteOne({ _id: id });
    return res.status(200).json({ msg: "User deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

// to get single user data
const GetUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleUser = await User.findOne({ _id: id }).select({ password: 0 });
    return res.status(200).json( getSingleUser );
  } catch (error) {
    next(error);
  }
};

// to update user
const UpdateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const UpdateUser = await User.updateOne(
      { _id: id },
      {
        $set: data,
      }
    );
    return res.status(200).json( UpdateUser );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  AllUserData,
  AllContacts,
  DeleteUserById,
  GetUserById,
  UpdateUserById,
  DeleteContactById
};
