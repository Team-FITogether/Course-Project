"use strict";

const Article = require("./../models/article.js");
const viewBagUtil = require("./../utils/view-bag");

const data = require("./../data")({ Article });

function loadCreateArticlePage(req, res) {
    let viewBag = viewBagUtil.getViewBag(req);

    res.render("articles/create-article", { viewBag });
}

function loadEditArticlePage(req, res) {
    let viewBag = viewBagUtil.getViewBag(req);
    let _id = req.body.articleId;

    data.getArticleById(_id)
        .then(article => {
            res.render("articles/edit-article", { article, viewBag });
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

function loadArticlesByGenrePage(req, res) {
    let viewBag = viewBagUtil.getViewBag(req);
    let genre = req.query.genre;

    data.getArticlesByGenre(genre)
        .then(articles => {
            res.render("articles/all-articles", { articles, viewBag });
        });
}

function loadSingleArticlePage(req, res) {
    let viewBag = viewBagUtil.getViewBag(req);
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
                viewBag
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
    createArticle,
    loadArticlesByGenrePage,
    loadSingleArticlePage,
    addComment,
    loadEditArticlePage,
    saveEditArticle
};