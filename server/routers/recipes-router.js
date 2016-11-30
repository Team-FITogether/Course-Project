"use strict";

const controllers = require("../controllers");

module.exports = (app, userValidator, common) => {
    const recipesController = controllers.recipes(userValidator, common);

    app.get("/recipes", recipesController.getAllRecipes);
    app.get("/recipes/single-recipe", recipesController.getSingleRecipe);

    app.post("/recipes/comments/add", recipesController.addComment);
};