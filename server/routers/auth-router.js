"use strict";

const controllers = require("../controllers");
const multer = require("multer");
const passport = require("passport");
const encryption = require("../utils/encryption");

const avatarUploader = multer({ dest: "./public/img/user-images" });

module.exports = (app, userValidator, common) => {
    const authController = controllers.auth(userValidator, passport, encryption, common);

    app.get("/auth/register", authController.loadRegisterPage);
    app.get("/auth/login", authController.loadLoginPage);
    app.get("/auth/logout", userValidator.isUserLoggedIn, authController.logoutUser);

    app.get("/auth/facebook", authController.loginUserFacebook);
    app.get("/auth/facebook/callback", authController.loginUserFacebook);
    app.get("/auth/google", authController.loginUserGoogle);
    app.get("/auth/google/callback", authController.loginUserGoogle);

    app.post("/auth/register", avatarUploader.single("avatar"), authController.registerUser);
    app.post("/auth/login", authController.loginUser);
};