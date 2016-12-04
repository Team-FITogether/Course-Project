"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let dietSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    deletedOn: { type: Date, default: null },
    createdOn: { type: Date, default: Date.now },
    comments: [{
        content: String,
        author: String,
        postDate: Date
    }]
});

const Diet = mongoose.model("dietprogram", dietSchema, "dietprograms");
module.exports = Diet;
