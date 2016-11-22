"use strict";

const Article = require("./../models/article.js");
const viewBagUtil = require("./../utils/view-bag");

function loadCreateArticlePage(req, res) {
    let viewBag = viewBagUtil.getViewBag(req);

    res.render("articles/create-article", { viewBag });
}

function loadEditArticlePage(req, res) {
    let viewBag = viewBagUtil.getViewBag(req);
    let _id = req.body.articleId;

    Article.findOne({ _id }).then(ar => {
        let article = ar;
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

    Article.findOneAndUpdate({ _id }, update, options,
        (err, ar) => {
            if (err) {
                console.log(err);
            }
        });


    res.redirect("/");
}

function createArticle(req, res) {
    let articleBody = req.body.articleBody;
    let articleHeader = req.body.articleHeader;
    let articleSubHeader = req.body.articleSubHeader;
    let articleGenre = "FITogether";

    var article = new Article({
        mainHeader: articleHeader,
        subHeader: articleSubHeader,
        author: req.user.username,
        imgSrc: "",
        genre: articleGenre,
        body: articleBody
    });

    article.save((err, ar) => {
        if (err) {
            console.error(err);
            req.redirect("/");
        }

        console.log(ar);
    });

    res.redirect("/");
}

function loadArticlesByGenrePage(req, res) {
    let viewBag = viewBagUtil.getViewBag(req);
    let genre = req.query.genre;
    Article
        .find({ genre })
        .then(articles => {
            res.render("articles/all-articles", { articles, viewBag });
        });
}

function loadSingleArticlePage(req, res) {
    let viewBag = viewBagUtil.getViewBag(req);
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
    loadCreateArticlePage,
    createArticle,
    loadArticlesByGenrePage,
    loadSingleArticlePage,
    addComment,
    loadEditArticlePage,
    saveEditArticle
};