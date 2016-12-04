"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let foodSchema = new Schema({
    title: { type: String, required: true },
    deletedOn: { type: Date, default: null },
    createdOn: { type: Date, default: Date.now }
});

const Food = mongoose.model("food", foodSchema, "foods");
module.exports = Food;
