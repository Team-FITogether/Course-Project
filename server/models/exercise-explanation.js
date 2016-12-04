"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validationConstants = require("../utils/validation-constants");

let exerciseExpalanationSchema = new Schema({
    title: { type: String, require: true, minlength: validationConstants.MIN_LENGTH, maxlength: validationConstants.MAX_TEXT_LENGTH },
    content: { type: String, require: true, minlength: validationConstants.MIN_LENGTH },
    category: { type: String, require: true, minlength: validationConstants.MIN_LENGTH, maxlength: 20 },
    author: { type: String, require: true, minlength: validationConstants.MIN_LENGTH, maxlength: validationConstants.MAX_USER_NAME_LENGTH },
    comments: [{
        content: String,
        author: String,
        postDate: Date
    }]
});

const ExerciseExplanation = mongoose.model("exerciseExplanation", exerciseExpalanationSchema, "exerciseexpalanations");
module.exports = ExerciseExplanation;