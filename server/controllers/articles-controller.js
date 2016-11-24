"use strict";

const Article = require("./../models/article.js");
const data = require("./../data")({ Article });

function loadCreateArticlePage(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    res.render("articles/create-article", { user });
}

function loadEditArticlePage(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    let _id = req.body.articleId;

    data.getArticleById(_id)
        .then(article => {
            res.render("articles/edit-article", { user, article });
        });
}

function loadArticlesByGenrePage(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    let genre = req.query.genre;

    data.getArticlesByGenre(genre)
        .then(articles => {
            res.render("articles/all-articles", { user, articles });
        });
}

function loadSingleArticlePage(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    let title = req.query.title;

    data.getArticleByTitle(title)
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

            res.render("articles/single-article", {
                mainHeader: article.mainHeader,
                subHeader: article.subHeader,
                imgSrc: article.imgSrc,
                author: article.author,
                body: article.body,
                id: article._id,
                isLoggedIn: !!req.user,
                comments: articleComments,
                user
            });
        });
}

function saveEditArticle(req, res) {
    let articleBody = req.body.articleBody;
    let articleHeader = req.body.articleHeader;
    let articleSubHeader = req.body.articleSubHeader;
    let _id = req.body.articleId;

    let update = { mainHeader: articleHeader, subHeader: articleSubHeader, body: articleBody };
    let options = { new: true };

    data.updateArticle(_id, update, options)
        .then(() => {
            res.redirect("/");
        })
        .catch((err) => {
            console.log(err);
        });
}

function createArticle(req, res) {
    let articleBody = req.body.articleBody;
    let articleHeader = req.body.articleHeader;
    let articleSubHeader = req.body.articleSubHeader;
    let articleGenre = "FITogether";

    data.createArticle(articleHeader, articleSubHeader, req.user.username, articleBody, articleGenre, "")
        .then(() => {
            res.redirect("/");
        })
        .catch(() => {
            req.redirect("/");
        });
}

function addComment(req, res) {
    let body = req.body;
    let comment = {
        content: body.content,
        author: req.user.username,
        postDate: Date.now()
    };

    data.getArticleById(body.entityId)
        .then(article => {
            article.comments.push(comment);
            article.save();
            res.redirect("back");
        })
        .catch(err => res.status(500).send(err));
}

module.exports = {
    loadCreateArticlePage,
    loadEditArticlePage,

    loadArticlesByGenrePage,
    loadSingleArticlePage,

    createArticle,
    saveEditArticle,
    addComment
};