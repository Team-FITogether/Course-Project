"use strict";

function isAdminUserMiddleware(req, res, next) {
    if (!req.user || req.user.roles.indexOf("admin") === -1) {
        res.redirect("/users/login");
    } else {
        next();
    }
}

function isInRole(user, role) {
    if (user.roles.includes(role)) {
        return true;
    }

    return false;
}

function isTrainerUserMiddleware(req, res, next) {
    let user = req.user;

    if (!user) {
        res.redirect("/auth/login");
    } else if (isInRole(user, "admin") || isInRole(user, "trainer")) {
        next();
    } else {
        res.redirect("/auth/login");
    }
}

function isUserLoggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect("/auth/login");
    }
}

module.exports = {
    isTrainerUserMiddleware,
    isAdminUserMiddleware,
    isUserLoggedIn,
    isInRole
};