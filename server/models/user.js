const mongoose = require('mongoose');
const encryption = require('../utils/encryption');

const userSchema = mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  passHash: String,
  salt: String,
  age: Number,
  roles: [String]
});

const User = mongoose.model('user', userSchema);
module.exports = User;