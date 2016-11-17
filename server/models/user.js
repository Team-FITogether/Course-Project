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

userSchema.methods = {
  isValidPassword(password) {
    let realPassHash = this.passHash;
    let currentPassHash = encryption.getPassHash(this.salt, password);
    let isValid = currentPassHash === realPassHash;

    return isValid;
  }
};

const User = mongoose.model('user', userSchema);
module.exports = User;