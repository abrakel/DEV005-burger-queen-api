const mongoose = require('mongoose');
const {Schema} = mongoose;
const jwt = require("jsonwebtoken");
const Joi = require('joi');

const userSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },  
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    Enum: ["admin", "waiter", "chef"]
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

const UserModel = mongoose.model('user', userSchema);

const validate = (user) => {
  const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
  });
  return schema.validate(user);
};

module.exports = { UserModel, validate}