"use strict";

const mongoose = require("mongoose");

let exerciseSchema = mongoose.Schema({
    name: { type: String, require: true },
    imgSrc: { type: String }
});

const Exercise = mongoose.model("exercise", exerciseSchema, "exercises");
module.exports = Exercise;