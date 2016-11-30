"use strict";

const controllers = require("../controllers");

module.exports = (app, userValidator, common) => {
    const foodsController = controllers.foods(userValidator, common);

    app.get("/foods", foodsController.getAllFoods);
    app.get("/foods/single-food", foodsController.getSingleFood);
    app.get("/foods/single-food-category", foodsController.getFoodByCategory);
};