"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let dietSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    comments: []
});

const Diet = mongoose.model("dietprogram", dietSchema, "dietprograms");
module.exports = Diet;
