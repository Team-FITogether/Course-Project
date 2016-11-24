/* globals require module Promise*/
"use strict";

module.exports = function(models) {
    let Recipe = models.Recipe;

    return {
        getAllRecipes() {
            return new Promise((resolve, reject) => {
                Recipe
                    .find((err, recipes) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(recipes);
                    });
            });
        },
        getSingleRecipe(title) {
            return new Promise((resolve, reject) => {
                Recipe
                    .find({ title }, (err, recipe) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(recipe);
                    });
            });
        }
    }
}
