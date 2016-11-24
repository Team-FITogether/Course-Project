"use strict";

const Recipe = require("./../models/recipe.js");

function sortRecipes(recipes) {
    return recipes.sort((a, b) => {
        let firstTitle = a.title.toUpperCase();
        let secondTitle = b.title.toUpperCase();
        return firstTitle < secondTitle ? -1 : firstTitle > secondTitle ? 1 : 0;
    });
}

function getAllRecipes(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    Recipe
        .find()
        .then(recipes => {
            sortRecipes(recipes);
            res.render("food/all-recipes", { user, recipes });
        });
}

function getSingleRecipe(req, res) {
    let title = req.query.title;

    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    Recipe.find({ title })
        .then((recipe) => {
            res.render("food/single-recipe", {
                title: recipe[0].title,
                body: recipe[0].body,
                imgSrc: recipe[0].imgSrc,
                comments: recipe[0].comments,
                user
            });
        });

}

module.exports = { getAllRecipes, getSingleRecipe };