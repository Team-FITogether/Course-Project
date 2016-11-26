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

function toggleLikeOnArticle(req, res) {
    let articleId = req.body.targetId;

    data.getArticleById(articleId)
        .then(article => {
            for (let i = 0; i < article.usersLiked.length; i++) {
                if (article.usersLiked[i].user === req.user.username) {
                    return i;
                }
            }
            return -1;
        })
        .then(index => {
            console.log(index);
            if (index !== -1) {
                let update = { $inc: { likes: -1 } };

                data.updateArticle(articleId, update, null)
                    .then((article) => {

                        article.usersLiked.splice(index, 1);
                        article.save();
                        return article;
                    })
                    .then((article) => {
                        res.json((JSON.stringify(article.likes - 1)));
                    });
            } else {
                let update = { $inc: { likes: 1 } };

                data.updateArticle(articleId, update, null)
                    .then((article) => {
                        let user = { user: req.user.username }

                        article.usersLiked.push(user);
                        article.save();
                        return article;
                    })
                    .then((article) => {
                        res.json((JSON.stringify(article.likes + 1)));
                    });
            }
        });
}

function returnArticlesAsJson(req, res) {
    let genre = req.body.genre;
    console.log(req.body)
    console.log(req.body.genre)
    data.getArticlesByGenre(genre)
        .then(articles => {
            res.json(JSON.stringify(articles));
        });
}

module.exports = {
    loadCreateArticlePage,
    loadEditArticlePage,

    loadArticlesByGenrePage,
    loadSingleArticlePage,

    createArticle,
    saveEditArticle,
    addComment,
    toggleLikeOnArticle,
    returnArticlesAsJson
};