const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const UserSchema = new mongoose.Schema(
  {
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    PhoneNumber: { type: Number },
    isAdmin: { type: String, enum: ["user", "admin"], default: "user" },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.methods.generateAuthToken =function () {
  try {
    return jwt.sign(
      { id: this._id, isAdmin: this.isAdmin },
      process.env.JWT_SECRET
    );
  } catch (error) {
    console.log(error);
  }
};
const User = mongoose.model("User", UserSchema);
function validateRegisterUser(obj) {
  const schema = joi.object({
    FirstName: joi.string().trim().min(2).max(100).required(),
    LastName: joi.string().trim().min(2).max(100).required(),
    email: joi.string().trim().min(5).max(100).required().email(),
    password: passwordComplexity().required(),
  });
  return schema.validate(obj);
}
function validateLogInUser(obj) {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).required().email(),
    password: passwordComplexity().required(),
  });
  return schema.validate(obj);
}
function validateUpdateUser(obj) {
  const schema = joi.object({
    FirstName: joi.string().trim().min(2).max(100),
    LastName: joi.string().trim().min(2).max(100),
    email: joi.string().trim().min(5).max(100).email(),
    password: passwordComplexity(),
  });
  return schema.validate(obj);
}
module.exports = {
  User,
  validateLogInUser,
  validateRegisterUser,
  validateUpdateUser,
};
