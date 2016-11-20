"use strict";

const Recipe = require("./../models/recipe.js");
const viewBagUtil = require("./../utils/view-bag");

function getAllRecipes(req, res) {
    let viewBag = viewBagUtil.getViewBag(req);

    Recipe
        .find()
        .then(recipes => {
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