"use strict";

const controllers = require("../controllers");

module.exports = (app) => {
    app.get("/foods", controllers.foods.getAllFoods);
    app.get("/foods/single-food", controllers.foods.getSingleFood);
    app.get("/foods/single-food-category", controllers.foods.getFoodByCategory);
};