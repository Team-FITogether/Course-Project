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
    likes: { type: Number, default: 0 },
    deletedOn: { type: Date, default: null },
    createdOn: { type: Date, default: Date.now },
    usersLiked: [{
        user: String
    }],
    comments: [{
        content: String,
        author: String,
        postDate: Date
    }]
});

const Article = mongoose.model("article", articleSchema, "articles");
module.exports = Article;