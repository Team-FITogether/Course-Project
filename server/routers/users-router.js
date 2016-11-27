"use strict";

const controllers = require("../controllers");

module.exports = (app, userValidator) => {
    app.get("/users/profile", userValidator.isUserLoggedIn, controllers.user.loadProfilePage);
    app.get("/users?", controllers.user.loadFoundUserProfilePage);
    app.get("/admin-pannel", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, controllers.user.loadAdminPannel);
    app.get("/users/all", userValidator.isUserLoggedIn, userValidator.isAdminUserMiddleware, controllers.user.getAllUsers);
    app.get("/users/profile/my-calendar", userValidator.isUserLoggedIn, controllers.user.loadUserCallendar);
    app.get("/users/profile/my-articles", userValidator.isUserLoggedIn, controllers.user.loadUserArticles);

    app.post("/users/set-role", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, controllers.user.addRole);
    app.post("/users/profile/my-calendar", userValidator.isUserLoggedIn, controllers.user.AddWorkout);
};