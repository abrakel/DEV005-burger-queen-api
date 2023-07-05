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
  roles: {
    type: String,
    Enum: ["admin", "waiter", "chef"]
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;