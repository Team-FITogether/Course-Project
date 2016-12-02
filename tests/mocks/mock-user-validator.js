let userValidator = {
    isTrainerUserMiddleware: (req, res, next) => { next(); },
    isAdminUserMiddleware: (req, res, next) => { next(); },
    isUserLoggedIn: (req, res, next) => { next(); },
    isInRole: (user, role) => { }
};

module.exports = userValidator;