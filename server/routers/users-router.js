"use strict";

module.exports = ({ app, userValidator, controllers }) => {
    const userController = controllers.user;

    app.get("/users/profile", userValidator.isUserLoggedIn, userController.loadProfilePage);
    app.get("/users?", userController.loadFoundUserProfilePage);
    app.get("/admin-panel", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, userController.loadAdminPanel);
    app.get("/users/all", userValidator.isUserLoggedIn, userValidator.isAdminUserMiddleware, userController.getAllUsers);

    app.post("/users/set-role", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, userController.addRole);
    app.post("/users/profile/my-workout", userValidator.isUserLoggedIn, userController.addWorkoutToUser);
    app.post("/users/profile/my-menu", userValidator.isUserLoggedIn, userController.addMenuToUser);
    app.post("/exercises/add-new", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, userController.addNewExerciseCategory);
};