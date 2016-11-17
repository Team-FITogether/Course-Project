function isAdminUserMiddleware(req, res, next) {
  if (!req.user || req.user.roles.indexOf('admin') === -1) {
    res.redirect('/users/login');
  } else {
    next();
  }
}

function isInRole(user, role) {
  if (user.roles.indexOf(role.toLowerCase()) !== -1) {
    return true;
  } else {
    return false;
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
  isAdminUserMiddleware,
  isUserLoggedIn,
  isInRole
};