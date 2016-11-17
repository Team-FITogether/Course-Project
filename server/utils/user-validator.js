function isUserInRole(req, res, next) {
  if (!req.user || req.user.roles.indexOf('admin') === -1) {
    res.redirect('/users/login');
  } else {
    next();
  }
}

function isUserLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/users/login');
  }
}

module.exports = {
  isUserInRole,
  isUserLoggedIn
};