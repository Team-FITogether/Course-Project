"use strict";

const controllers = require("../controllers");

module.exports = (app, userValidator) => {
    const userController = controllers.user(userValidator);

    app.get("/users/profile", userValidator.isUserLoggedIn, userController.loadProfilePage);
    app.get("/users?", userController.loadFoundUserProfilePage);
    app.get("/admin-pannel", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, userController.loadAdminPannel);
    app.get("/users/all", userValidator.isUserLoggedIn, userValidator.isAdminUserMiddleware, userController.getAllUsers);

    app.post("/users/set-role", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, userController.addRole);
    app.post("/users/profile/my-workout", userValidator.isUserLoggedIn, userController.addWorkoutToUser);
    app.post("/users/profile/my-menu", userValidator.isUserLoggedIn, userController.addMenuToUser);
};