"use strict";

const userValidator = require("./user-validator");

function getViewBag(req) {
    let username = req.user ? req.user.username : "";
    let isLoggedIn = !!req.user;
    let isTrainer = !req.user ? false : userValidator.isInRole(req.user, "trainer");
    let isAdmin = !req.user ? false : userValidator.isInRole(req.user, "admin");
    let userId = !req.user ? null : req.user.id;
    let error = false;
    let isOnHomePage = false;

    let globals = {
        username,
        isLoggedIn,
        isTrainer,
        isAdmin,
        userId,
        error,
        isOnHomePage
    };
    return globals;
}

module.exports = { getViewBag };