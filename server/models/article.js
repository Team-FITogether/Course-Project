"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validationConstants = require("../utils/validation-constants");

let articleSchema = new Schema({
    mainHeader: { type: String, require: true, minlength: validationConstants.MIN_LENGTH, maxlength: validationConstants.MAX_TEXT_LENGTH },
    subHeader: { type: String, minlength: validationConstants.MIN_LENGTH, maxlength: validationConstants.MAX_TEXT_LENGTH },
    author: { type: String, require: true, minlength: validationConstants.MIN_LENGTH, maxlength: validationConstants.MAX_USER_NAME_LENGTH },
    imgSrc: { type: String, minlength: validationConstants.MIN_LENGTH, maxlength: validationConstants.MAX_TEXT_LENGTH },
    genre: { type: String, require: true, minlength: validationConstants.MIN_LENGTH, maxlength: validationConstants.MAX_TEXT_LENGTH },
    body: { type: String, require: true, minlength: validationConstants.MIN_LENGTH, maxlength: validationConstants.MAX_TEXT_LENGTH },
    likes: { type: Number, default: validationConstants.MIN_NUMBER, min: validationConstants.MIN_NUMBER },
    deletedOn: { type: Date, default: null },
    createdOn: { type: Date, default: Date.now },
    usersLiked: [{
        user: { type: String, minlength: validationConstants.MIN_LENGTH, maxlength: validationConstants.MAX_USER_NAME_LENGTH }
    }],
    comments: [{
        content: { type: String, minlength: validationConstants.MIN_LENGTH },
        author: { type: String, minlength: validationConstants.MIN_LENGTH, maxlength: validationConstants.MAX_USER_NAME_LENGTH },
        postDate: Date
    }]
});

const Article = mongoose.model("article", articleSchema, "articles");
module.exports = Article;