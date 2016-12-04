"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validationConstant = require("../utils/validation-constants");

let foodDetailsSchema = new Schema({
    title: { type: String, required: true, minlength: validationConstant.MIN_LENGTH },
    details: { type: String, required: true, minlength: validationConstant.MIN_LENGTH },
    calories: { type: String, required: true, minlength: 1 },
    proteins: { type: String, required: true, minlength: 1 },
    carbs: { type: String, required: true, minlength: 1 },
    fats: { type: String, required: true, minlength: 1 },
    category: { type: String, minlength: validationConstant.MIN_LENGTH }
});

const FoodDetails = mongoose.model("foodDetails", foodDetailsSchema, "fooddetails");
module.exports = FoodDetails;
