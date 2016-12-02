"use strict";

module.exports = ({ app, userValidator, controllers }) => {
    const userController = controllers.user;

    app.get("/users/profile", userValidator.isUserLoggedIn, userController.loadProfilePage);
    app.get("/users?", userController.loadFoundUserProfilePage);
    app.get("/users/all", userValidator.isUserLoggedIn, userValidator.isAdminUserMiddleware, userController.getAllUsers);

    app.post("/users/profile/my-workout", userValidator.isUserLoggedIn, userController.addWorkoutToUser);
    app.post("/users/profile/my-menu", userValidator.isUserLoggedIn, userController.addMenuToUser);
    app.post("/users/profile/friendship-request", userValidator.isUserLoggedIn, userController.requestFriendship);
    app.post("/users/profile/friendship-approved", userValidator.isUserLoggedIn, userController.approveFriendship);
};
