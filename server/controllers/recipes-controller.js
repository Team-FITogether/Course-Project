"use strict";

const Recipe = require("./../models/recipe.js");
const viewBagUtil = require("./../utils/view-bag");

function sortRecipes(recipes) {
    return recipes.sort((a, b) => {
        let firstTitle = a.title.toUpperCase();
        let secondTitle = b.title.toUpperCase();
        return firstTitle < secondTitle ? -1 : firstTitle > secondTitle ? 1 : 0;
    });
}

function getAllRecipes(req, res) {
    let viewBag = viewBagUtil.getViewBag(req);

    Recipe
        .find()
        .then(recipes => {
            sortRecipes(recipes);
            res.render("food/all-recipes", { recipes, viewBag });
        });
}

function getSingleRecipe(req, res) {
    let title = req.query.title;
    let viewBag = viewBagUtil.getViewBag(req);

    Recipe.find({ title })
        .then((recipe) => {
            res.render("food/single-recipe", {
                title: recipe[0].title,
                body: recipe[0].body,
                imgSrc: recipe[0].imgSrc,
                comments: recipe[0].comments,
                viewBag
            });
        });

}

module.exports = { getAllRecipes, getSingleRecipe };