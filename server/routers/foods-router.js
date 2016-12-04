"use strict";

module.exports = ({ app, userValidator, controllers }) => {
    const foodsController = controllers.foods;

    app.get("/foods", userValidator.isUserLoggedIn, userValidator.isAdminUserMiddleware, foodsController.getAllFoods);
    app.get("/foods/single-food", userValidator.isUserLoggedIn, userValidator.isAdminUserMiddleware, foodsController.getSingleFood);
    app.get("/foods/single-food-category", userValidator.isUserLoggedIn, userValidator.isAdminUserMiddleware, foodsController.getFoodByCategory);

    app.post("/foods/edit", userValidator.isUserLoggedIn, userValidator.isAdminUserMiddleware, foodsController.loadEditFoodPage);
    app.post("/foods/create/update", userValidator.isTrainerUserMiddleware, userValidator.isUserLoggedIn, foodsController.saveEditedFood);
    app.post("/foods/create/save", userValidator.isTrainerUserMiddleware, userValidator.isUserLoggedIn, foodsController.createFood);
    app.post("/foods/delete", userValidator.isUserLoggedIn, userValidator.isAdminUserMiddleware, foodsController.deleteFood);
    app.post("/foods/restore", userValidator.isUserLoggedIn, userValidator.isAdminUserMiddleware, foodsController.restoreFood);
};
