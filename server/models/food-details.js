"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let foodDetailsSchema = new Schema({
    title: { type: String, required: true },
    details: { type: String, required: true },
    calories: { type: String, required: true },
    proteins: { type: String, required: true },
    carbs: { type: String, required: true },
    fats: { type: String, required: true },
    category: { type: String }
});

const FoodDetails = mongoose.model("foodDetails", foodDetailsSchema, "fooddetails");
module.exports = FoodDetails;
