"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let exerciseCategorySchema = new Schema({
    name: { type: String, required: true }
});

const ExerciseCategoryModel = mongoose.model("exerciseCategory", exerciseCategorySchema, "exercisecategories");
module.exports = ExerciseCategoryModel;