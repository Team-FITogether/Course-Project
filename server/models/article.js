"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let articleSchema = new Schema({
    mainHeader: { type: String, require: true },
    subHeader: { type: String },
    author: { type: String, require: true },
    imgSrc: { type: String },
    genre: { type: String, require: true },
    body: { type: String, require: true },
    comments: []
});

const Article = mongoose.model("article", articleSchema, "articles");
module.exports = Article;