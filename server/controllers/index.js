/* globals require */
"use strict";

const controllers = {
    user: require("./user-controller"),
    home: require("./home-controller"),
    articles: require("./articles-controller")
};

module.exports = controllers;