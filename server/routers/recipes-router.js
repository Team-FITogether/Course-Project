"use strict";

// const express = require("express");
const controllers = require("../controllers");

module.exports = (app) => {
    app.get("/recipes", controllers.recipes.getAllRecipes);
};