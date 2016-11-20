"use strict";

const controllers = {
    user: require("./user-controller"),
    home: require("./home-controller"),
    articles: require("./articles-controller"),
    exercises: require("./exercises-controller"),
    recipes: require("./recipes-controller")
};

module.exports = controllers;
