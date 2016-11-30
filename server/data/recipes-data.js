/* globals require module Promise*/
"use strict";

const Recipe = require("../models/recipe");

module.exports = {
    getAllRecipes() {
        return new Promise((resolve, reject) => {
            Recipe.find((err, recipes) => {
                if (err) {
                    return reject(err);
                }

                return resolve(recipes);
            });
        });
    },
    getSingleRecipe(title) {
        return new Promise((resolve, reject) => {
            Recipe.find({ title }, (err, recipe) => {
                if (err) {
                    return reject(err);
                }

                return resolve(recipe);
            });
        });
    },
    getRecipeById(id) {
        return new Promise((resolve, reject) => {
            Recipe.findOne({ "_id": id }, (err, recipe) => {
                if (err) {
                    return reject(err);
                }

                return resolve(recipe);
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
    }
};