"use strict";

const express = require("express");
const controllers = require("../controllers");
const passport = require("passport");
const multer = require("multer");

module.exports = (app, userValidator) => {
    const upload = multer({dest: './server/tmp/user-images'});

    app.get("/users/register", controllers.user.loadRegisterPage);
    app.get("/users/login", controllers.user.loadLoginPage);
    app.get("/admin-pannel", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, controllers.user.loadAdminPannel)

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    app.post("/users/register", upload.single("avatar"), controllers.user.registerUser);
    app.post("/users/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    }));
    app.post("/users/set-role", controllers.user.addRole);
};