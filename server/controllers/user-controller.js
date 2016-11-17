const User = require('../models/user');
const encryption = require('../utils/encryption');

function loadRegisterPage(req, res) {
  res.render('user/register');
}

function registerUser(req, res) {
  const body = req.body;

  User
    .findOne({ username: body.username })
    .then(user => {
      if (!user) {
        let salt = encryption.getSalt();
        let passHash = encryption.getPassHash(salt, body.password);
        User
          .create({
            username: body.username,
            passHash,
            salt
          })
          .then(() => res.redirect('/login'))
          .catch(err => console.log(err));
      } else {
        res.status(409);
        res.send('User already exists.');
        res.end();
      }
    })
}

module.exports = {
  loadRegisterPage,
  registerUser
};