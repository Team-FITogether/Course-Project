"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validationConstants = require("../utils/validation-constants");

let articleSchema = new Schema({
    mainHeader: { type: String, require: true, minlength: validationConstants.MIN_LENGTH, maxlength: validationConstants.MAX_TEXT_LENGTH },
    subHeader: { type: String, minlength: validationConstants.MIN_LENGTH, maxlength: validationConstants.MAX_TEXT_LENGTH },
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