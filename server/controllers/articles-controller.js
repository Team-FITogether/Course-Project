"use strict";

const mongoose = require("mongoose");
const Article = require("./../models/article.js");

function loadArticlesByGenrePage(req, res) {
    let genre = req.query.genre;
    Article
        .find({ genre })
        .then(articles => {
            res.render("articles/all-articles", { articles });
        });
}

function loadSingleArticlePage(req, res) {
    let title = req.query.title;
    Article
        .findOne({ mainHeader: title })
        .then(article => {
            res.render("articles/single-article", {
                mainHeader: article.mainHeader,
                subHeader: article.subHeader,
                imgSrc: article.imgSrc,
                author: article.author,
                body: article.body
            });
        });
}

module.exports = {
    loadArticlesByGenrePage,
    loadSingleArticlePage
};