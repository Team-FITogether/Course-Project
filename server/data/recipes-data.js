/* globals require module Promise*/
"use strict";

module.exports = function(models) {
    let { Recipe } = models;

    return {
        getAllRecipes(page, pageSize) {
            let skip = (page - 1) * pageSize;
            let limit = pageSize;

            return Promise.all([
                new Promise((resolve, reject) => {
                    Recipe.find({})
                        .skip(skip)
                        .limit(limit)
                        .exec((err, recipes) => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(recipes);
                        });
                }),
                new Promise((resolve, reject) => {
                    Recipe.count()
                        .exec((err, count) => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(count);
                        });
                })
            ]);
        },
        getRecipeById(id) {
            return new Promise((resolve, reject) => {
                Recipe.findOne({ "_id": id }, (err, recipe) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(recipe || null);
                });
            });
        },
        getSingleRecipe(title) {
            return new Promise((resolve, reject) => {
                Recipe.findOne({ title }, (err, recipe) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(recipe || null);
                });
            });
        },
        findRecipeByQueryWithSelectIdAndTitle(query) {
            return new Promise((resolve, reject) => {
                Recipe.find(query)
                    .select("_id title")
                    .exec((err, recipes) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(recipes);
                    });
            });
        },
        updateRecipe(id, update, options) {
            return new Promise((resolve, reject) => {
                Recipe.findOneAndUpdate({ "_id": id }, update, options,
                    (err, recipe) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(recipe || null);
                    });
            });
        },
        addNewRecipe(title, content) {
            return new Promise((resolve, reject) => {
                let recipe = new Recipe({
                    title,
                    body: content
                });

                recipe.save((err, createdRecipe) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(createdRecipe);
                });
            });
        }
    };
};
