"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validationConstants = require("../utils/validation-constants");

let foodSchema = new Schema({
    title: { type: String, required: true, minlength: validationConstants.MIN_LENGTH, maxlength: validationConstants.MAX_TEXT_LENGTH },
    deletedOn: { type: Date, default: null },
    createdOn: { type: Date, default: Date.now }
});

const Food = mongoose.model("food", foodSchema, "foods");
module.exports = Food;
