"use strict";

module.exports = ({ app, userValidator, controllers }) => {
    const recipesController = controllers.recipes;

    app.get("/recipes", recipesController.getAllRecipes);
    app.get("/recipes/single-recipe", recipesController.getSingleRecipe);

    app.post("/recipes/comments/add", recipesController.addComment);
    app.post("/recipes/edit", userValidator.isUserLoggedIn, userValidator.isAdminUserMiddleware, recipesController.loadEditRecipePage);
    app.post("/recipes/create/update", userValidator.isTrainerUserMiddleware, userValidator.isUserLoggedIn, recipesController.saveEditedRecipe);
    app.post("/recipes/create/save", userValidator.isTrainerUserMiddleware, userValidator.isUserLoggedIn, recipesController.createRecipe);
    app.post("/recipes/delete", userValidator.isUserLoggedIn, userValidator.isAdminUserMiddleware, recipesController.deleteRecipe);
    app.post("/recipes/restore", userValidator.isUserLoggedIn, userValidator.isAdminUserMiddleware, recipesController.restoreRecipe);
    app.post("/api/recipes/like", userValidator.isUserLoggedIn, recipesController.toggleLikeOnRecipe);
};