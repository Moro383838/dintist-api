const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User } = require("../models/User");

exports.GetAllUser = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  return res.status(200).json(users);
});
module.exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "user has been deleted successfully" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});
exports.GetUser = asyncHandler(async (req, res) => {
  const user = await User.FindOne(req.params.id);
  if (user) {
    return res.status(200).json(user);
  } else res.status(404).json({ message: "user not found" });
});
