"use strict";

module.exports = ({ app, userValidator, controllers }) => {
    const userController = controllers.user;
    const adminController = controllers.admin;

    app.get("/users/profile", userValidator.isUserLoggedIn, userController.loadProfilePage);
    app.get("/users?", userController.loadFoundUserProfilePage);
    app.get("/admin-panel", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, adminController.loadAdminPanel);
    app.get("/select-category", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, adminController.addNewFood);
    app.get("/users/all", userValidator.isUserLoggedIn, userValidator.isAdminUserMiddleware, userController.getAllUsers);

    app.post("/users/set-role", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, adminController.addRole);
    app.post("/users/profile/my-workout", userValidator.isUserLoggedIn, userController.addWorkoutToUser);
    app.post("/users/profile/my-menu", userValidator.isUserLoggedIn, userController.addMenuToUser);
    app.post("/users/profile/friendship-request", userValidator.isUserLoggedIn, userController.requestFriendship);
    app.post("/users/profile/friendship-approved", userValidator.isUserLoggedIn, userController.approveFriendship);
    app.post("/exercises/add-new", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, adminController.addNewExerciseCategory);
    app.post("/foods/add-new", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, adminController.addNewFoodCategory);
    app.post("/recipes/add-new", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, adminController.addNewRecipe);
    app.post("/diets/add-new", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, adminController.addNewDiet);
    app.post("/fooddetails/add-new", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, adminController.addNewFood);
};
