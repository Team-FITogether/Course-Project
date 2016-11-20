"use strict";

const controllers = require("../controllers");

module.exports = (app) => {
    app.get("/recipes", controllers.recipes.getAllRecipes);
};