"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let exerciseCategorySchema = new Schema({
    name: { type: String, required: true, minlength: 100 }
});

const ExerciseCategoryModel = mongoose.model("exerciseCategory", exerciseCategorySchema, "exercisecategories");
module.exports = ExerciseCategoryModel;