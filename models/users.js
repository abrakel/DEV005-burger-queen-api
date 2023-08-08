const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({  
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
    enum: ["admin", "waiter", "chef"],
    default: "waiter"
  }
});

const User = mongoose.model('user', userSchema);
module.exports = User;