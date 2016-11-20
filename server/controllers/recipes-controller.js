"use strict";

const mongoose = require("mongoose");
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

module.exports = { getAllRecipes };