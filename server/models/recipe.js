"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let recipeSchema = new Schema({
    title: { type: String, required: true },
    body: {type: String, required: true },
    imgSrc: { type: String },
    comments: []
});

const Recipe = mongoose.model("recipe", recipeSchema, "recipes");
module.exports = Recipe;