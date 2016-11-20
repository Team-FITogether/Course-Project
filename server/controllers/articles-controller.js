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
            let articleComments = article
                .comments
                .map(c => {
                    return {
                        content: c.content,
                        postDate: c.postDate.toString().substring(0, 25),
                        author: c.author
                    };
                });

                console.log(articleComments);
            res.render("articles/single-article", {
                mainHeader: article.mainHeader,
                subHeader: article.subHeader,
                imgSrc: article.imgSrc,
                author: article.author,
                body: article.body,
                id: article._id,
                isLoggedIn: !!req.user,
                comments: articleComments
            });
        });
}

function addComment(req, res) {
    let body = req.body;
    let comment = {
        content: body.content,
        author: req.user.username,
        postDate: Date.now()
    };

    Article
        .findById(body.entityId)
        .then(article => {
            article.comments.push(comment);
            article.save();
            res.redirect("back");
        })
        .catch(err => res.status(500).send(err));
}

module.exports = {
    loadArticlesByGenrePage,
    loadSingleArticlePage,
    addComment
};