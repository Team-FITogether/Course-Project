"use strict";

const multer = require("multer");

const avatarUploader = multer({ dest: "./public/img/user-images" });

module.exports = ({ app, userValidator, controllers }) => {
    const authController = controllers.auth;

    app.get("/auth/register", userValidator.LimitLoggedInUserMiddleware, authController.loadRegisterPage);
    app.get("/auth/login", userValidator.LimitLoggedInUserMiddleware, authController.loadLoginPage);
    app.get("/auth/logout", userValidator.isUserLoggedIn, authController.logoutUser);

    app.get("/auth/facebook", authController.loginUserFacebook);
    app.get("/auth/facebook/callback", authController.loginUserFacebook);
    app.get("/auth/google", authController.loginUserGoogle);
    app.get("/auth/google/callback", authController.loginUserGoogle);

    app.post("/auth/register", avatarUploader.single("avatar"), authController.registerUser);
    app.post("/auth/login", authController.loginUser);
};