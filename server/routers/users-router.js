"use strict";

const express = require("express");
const controllers = require("../controllers");
const passport = require("passport");

module.exports = (app, userValidator) => {
    app.get("/users/register", controllers.user.loadRegisterPage);
    app.get("/users/login", controllers.user.loadLoginPage);
    app.get("/admin-pannel", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, controllers.user.loadAdminPannel)

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect("/");
    });

    app.post("/users/register", controllers.user.registerUser);
    app.post("/users/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    }));
    app.post("/users/set-role", controllers.user.addRole);
};