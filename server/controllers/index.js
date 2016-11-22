"use strict";

const controllers = {
    user: require("./user-controller"),
    home: require("./home-controller"),
    articles: require("./articles-controller"),
    exercises: require("./exercises-controller"),
    recipes: require("./recipes-controller"),
    searches: require("./searches-controller"),
    diets: require("./diets-controller"),
    foods: require("./foods-controller"),
    trainers: require("./trainers-controller")
};

module.exports = controllers;
