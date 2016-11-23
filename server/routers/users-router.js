"use strict";

const controllers = require("../controllers");
const multer = require("multer");

module.exports = (app, userValidator) => {
    const upload = multer({ dest: "./public/img/user-images" });

    app.get("/users/register", controllers.user.loadRegisterPage);
    app.get("/users/login", controllers.user.loadLoginPage);
    app.get("/users/profile/:userId", userValidator.isUserLoggedIn, controllers.user.loadProfilePage);
    app.get("/users/:id", controllers.user.loadFoundUserProfilePage);
    app.get("/admin-pannel", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, controllers.user.loadAdminPannel)
    app.get("/logout", userValidator.isUserLoggedIn, controllers.user.logoutUser);
    app.get("/users/all", userValidator.isUserLoggedIn, userValidator.isAdminUserMiddleware, controllers.user.getAllUsers)

    app.post("/users/register", upload.single("avatar"), controllers.user.registerUser);
    app.post("/users/login", controllers.user.loginUser);
    app.post("/users/set-role", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, controllers.user.addRole);
};