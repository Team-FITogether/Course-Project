"use strict";

const controllers = require("../controllers");

module.exports = (app) => {
    app.get("/recipes", controllers.recipes.getAllRecipes);
    app.get("/recipes/single-recipe", controllers.recipes.getSingleRecipe);

    app.post("/recipes/comments/add", controllers.recipes.addComment);
};