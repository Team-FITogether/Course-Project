"use strict";

const mongoose = require("mongoose");
const Recipe = require("./../models/recipe.js");

function getAllRecipes(req, res) {
    Recipe
        .find()
        .then(recipes => {
            res.render("recipes/all-recipes", { recipes });
        });
}

module.exports = { getAllRecipes };