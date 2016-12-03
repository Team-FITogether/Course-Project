"use strict";

module.exports = ({ app, userValidator, controllers }) => {
    const adminController = controllers.admin;

    app.get("/admin-panel", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, adminController.loadAdminPanel);
    app.get("/select-category", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, adminController.addNewFood);

    app.post("/users/set-role", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, adminController.addRole);
    app.post("/exercises/add-new", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, adminController.addNewExerciseCategory);
    app.post("/foods/add-new", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, adminController.addNewFoodCategory);
    app.post("/recipes/add-new", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, adminController.addNewRecipe);
    app.post("/diets/add-new", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, adminController.addNewDiet);
    app.post("/fooddetails/add-new", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, adminController.addNewFood);
}
