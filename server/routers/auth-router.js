"use strict";

const controllers = require("../controllers");
const multer = require("multer");

const avatarUploader = multer({ dest: "./public/img/user-images" });

module.exports = (app, userValidator) => {
    app.get("/auth/register", controllers.auth.loadRegisterPage);
    app.get("/auth/login", controllers.auth.loadLoginPage);
    app.get("/auth/logout", userValidator.isUserLoggedIn, controllers.auth.logoutUser);

    app.post("/auth/register", avatarUploader.single("avatar"), controllers.auth.registerUser);
    app.post("/auth/login", controllers.auth.loginUser);

    app.get("/auth/facebook", controllers.auth.loginUserFacebook);
    app.get("/auth/facebook/callback", controllers.auth.loginUserFacebook);
};