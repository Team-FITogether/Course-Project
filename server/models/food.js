"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let foodSchema = new Schema({
    title: { type: String, required: true }
});

const Food = mongoose.model("food", foodSchema, "foods");
module.exports = Food;