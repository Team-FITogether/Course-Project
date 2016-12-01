"use strict";

module.exports = ({ app, userValidator, controllers }) => {
    const recipesController = controllers.recipes;

    app.get("/recipes", recipesController.getAllRecipes);
    app.get("/recipes/single-recipe", recipesController.getSingleRecipe);

    app.post("/recipes/comments/add", recipesController.addComment);
    app.post("/api/recipes/like", userValidator.isUserLoggedIn, recipesController.toggleLikeOnRecipe);
};