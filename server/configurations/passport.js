const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, (username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      } else if (!user) {
        done(null, false, { message: 'Incorrect credentials.' });
      } else if (!user.isValidPassword(password)) {
        done(null, false, { message: 'Incorrect credentials.' });
      } else {
        return done(null, user);
      }
    });
  }));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};