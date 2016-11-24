"use strict";

function isAdminUserMiddleware(req, res, next) {
    if (!req.user || req.user.roles.indexOf("admin") === -1) {
        res.redirect("/users/login");
    } else {
        next();
    }
}

function isTrainerUserMiddleware(req, res, next) {
    let user = req.user;

    if (!user) {
        res.redirect("/users/login");
    } else if (isInRole(user, "admin") || isInRole(user, "trainer")) {
        next();
    } else {
        res.redirect("/users/login");
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
        res.redirect("/users/login");
    }
}

module.exports = {
    isTrainerUserMiddleware,
    isAdminUserMiddleware,
    isUserLoggedIn,
    isInRole
};