"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let exerciseSchema = new Schema({
    name: { type: String, require: true },
    imgSrc: { type: String }
});

const Exercise = mongoose.model("exercise", exerciseSchema, "exercises");
module.exports = Exercise;