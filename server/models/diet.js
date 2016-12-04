"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let dietSchema = new Schema({
    title: { type: String, required: true, minlength: 3, maxlength: 200 },
    body: { type: String, required: true, minlength: 3 },
    deletedOn: { type: Date, default: null },
    createdOn: { type: Date, default: Date.now },
    comments: [{
        content: { type: String, minlength: 3 },
        author: { type: String, minlength: 3, maxlength: 30 },
        postDate: Date
    }]
});

const Diet = mongoose.model("dietprogram", dietSchema, "dietprograms");
module.exports = Diet;