const mongoose = require('mongoose');
const encryption = require('../utils/encryption');

const userSchema = mongoose.Schema({
  username: String,
  passHash: String,
  salt: String,
  age: Number,
  roles: [String]
});

const User = mongoose.model('user', userSchema);
module.exports = User;