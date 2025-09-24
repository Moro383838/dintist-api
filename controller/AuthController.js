const asyncHandler = require("express-async-handler");
const {
  User,
  validateRegisterUser,
  generateAuthToken,
  validateLogInUser,
  validateUpdateUser,
} = require("../models/User");
const bcrypt = require("bcryptjs");
/**---------------------------------
 * @description Register New User
 * @route /api/auth/register
 * @method POST
 * @access public
 ---------------------------------*/
module.exports.RegisterCtrl = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).json({ message: "email already exsist" });
  }
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  user = new User({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    email: req.body.email,
    password: req.body.password,
  });

  const result = await user.save();
  const { password, ...other } = result._doc;
  const token = user.generateAuthToken();
  res.status(201).json({
    ...other,
    token,
    message: "you registered successfully, please login",
  });
});
exports.LoginCtrl = asyncHandler(async (req, res) => {
  const { error } = validateLogInUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(404).json({ message: "email or password wrong " });
  const matchPassword = await bcrypt.compare(req.body.password, user.password);
  if (!matchPassword)
    return res.status(404).json({ message: "email or password wrong " });
  const token = user.generateAuthToken();
  const { password, ...other } = user._doc;

  res.status(200).json({ ...other, token });
});

exports.UpdateCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  const updateuser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        email: req.body.email,
        password: req.body.password,
      },
    },
    { new: true }
  ).select("-password");
  res.status(200).json(updateuser);
});
