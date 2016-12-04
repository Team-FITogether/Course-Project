"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validationConstants = require("../utils/validation-constants");

let exerciseSchema = new Schema({
    name: { type: String, require: true, minlength: validationConstants.MIN_LENGTH, maxlength: 50 },
    imgSrc: { type: String, minlength: validationConstants.MIN_LENGTH, maxlength: validationConstants.MAX_IMG_SRC_LENGTH },
    bodyPart: { type: String, required: true }
});

const Exercise = mongoose.model("exercise", exerciseSchema, "exercises");
module.exports = Exercise;