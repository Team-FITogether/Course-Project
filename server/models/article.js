"use strict";

const mongoose = require("mongoose");

let articleSchema = mongoose.Schema({
    mainHeader: { type: String, require: true },
    subHeader: { type: String },
    author: { type: String, require: true },
    imgSrc: { type: String },
    genre: { type: String, require: true },
    body: { type: String, require: true },
    comments: [{
        content: String,
        author: String,
        postDate: Date
    }]
});

const Article = mongoose.model("article", articleSchema, "articles");
module.exports = Article;