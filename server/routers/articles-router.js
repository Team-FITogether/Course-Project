"use strict";

const express = require("express");
const controllers = require("../controllers");

module.exports = (app) => {
    app.get("/articles", controllers.articles.loadArticlesByGenrePage);
    app.get("/single-article", controllers.articles.loadSingleArticlePage);

    app.post("/articles/comments/add", controllers.articles.addComment);
};