"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let exerciseExpalanationSchema = new Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    category: { type: String, require: true },
    author: { type: String, require: true },
    comments: [{
        content: String,
        author: String,
        postDate: Date
    }]
});

const ExerciseExplanation = mongoose.model("exerciseExplanation", exerciseExpalanationSchema, "exerciseexpalanations");
module.exports = ExerciseExplanation;