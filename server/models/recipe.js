"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let recipeSchema = new Schema({
    title: { type: String, require: true },
    imgSrc: { type: String }
});

const Recipe = mongoose.model("recipe", recipeSchema, "recipes");
module.exports = Recipe;