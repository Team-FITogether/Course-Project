"use strict";

// const controllers = require("../controllers");

module.exports = ({ app, controllers }) => {
    const foodsController = controllers.foods;

    app.get("/foods", foodsController.getAllFoods);
    app.get("/foods/single-food", foodsController.getSingleFood);
    app.get("/foods/single-food-category", foodsController.getFoodByCategory);
};