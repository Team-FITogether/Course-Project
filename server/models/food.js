"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let foodSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    comments: []
});

const Food = mongoose.model("food", foodSchema, "foodgroups");

module.exports = Food;
