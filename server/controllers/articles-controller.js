"use strict";

const CREATE_ARTICLE_VIEW = "articles/create-article";
const EDIT_ARTICLE_VIEW = "articles/edit-article";
const ALL_ARTICLES_VIEW = "articles/all-articles";
const SINGLE_ARTICLE_VIEW = "articles/single-article";
const ADMIN_ROLE = "admin";

function loadArticlesByGenreForAdmin(user, req, res, genre, page, pageSize, userValidator, common, data) {
    common.setIsAdminUser(req, userValidator);
    if (user.isAdmin) {
        return data.getArticlesByGenreAdminUser(genre, page, pageSize)
            .then(result => {
                let articles = result[0];
                let count = result[1];
                let pages = count / pageSize;

                if (page > pages) {
                    res.render("error-pages/404-not-found");
                    return res.status(404);
                }

                // Check if current user has liked the article, if true - set bool
                // so view can render an unlike button
                if (user) {
                    for (let i = 0; i < articles.length; i += 1) {
                        for (let j = 0; j < articles[i].usersLiked.length; j += 1) {
                            if (articles[i].usersLiked[j].user === user.username) {
                                articles[i].currentUserHasLiked = true;
                            } else {
                                articles[i].currentUserHasLiked = false;
                            }
                        }
                    }
                }

                res.render(ALL_ARTICLES_VIEW, { user, articles, page, pages, genre });
            });
    }
}

function loadArticlesByGenreForNormalUser(user, req, res, genre, page, pageSize, data) {
    data.getArticlesByGenre(genre, page, pageSize)
        .then(result => {
            let articles = result[0];
            let count = result[1];
            let pages = count / pageSize;

            if (page > pages) {
                res.render("error-pages/404-not-found");
                return res.status(404);
            }

            // Check if current user has liked the article, if true - set bool
            // so view can render an unlike button
            if (user) {
                for (let i = 0; i < articles.length; i += 1) {
                    for (let j = 0; j < articles[i].usersLiked.length; j += 1) {
                        if (articles[i].usersLiked[j].user === user.username) {
                            articles[i].currentUserHasLiked = true;
                        } else {
                            articles[i].currentUserHasLiked = false;
                        }
                    }
                }
            }

            res.render(ALL_ARTICLES_VIEW, { user, articles, page, pages, genre });
        });
}

function getArticleCommentsMapped(article) {
    let articleComments = article
        .comments
        .map(c => {
            return {
                content: c.content,
                postDate: c.postDate.toString().substring(0, 25),
                author: c.author
            };
        });

    return articleComments;
}

function dislikeArticle(articleId, index, res, data) {
    let update = { $inc: { likes: -1 } };
    data.updateArticle(articleId, update, null)
        .then((article) => {
            article.usersLiked.splice(index, 1);
            article.save();
            return article;
        })
        .then(article => res.json(JSON.stringify(article.likes - 1)));
}

function likeArticle(articleId, req, res, data) {
    let update = { $inc: { likes: 1 } };
    data.updateArticle(articleId, update, null)
        .then((article) => {
            let user = { user: req.user.username };
            article.usersLiked.push(user);
            article.save();
            return article;
        })
        .then((article) => {
            res.json(JSON.stringify(article.likes + 1));
        });
}

function getSingleArticleObject(article, articleComments, user) {
    return {
        mainHeader: article.mainHeader,
        subHeader: article.subHeader,
        imgSrc: article.imgSrc,
        author: article.author,
        body: article.body,
        id: article._id,
        comments: articleComments,
        user
    };
}

module.exports = ({ userValidator, common, data }) => {
    return {
        loadCreateArticlePage(req, res) {
            common.setIsAdminUser(req, userValidator);
            res.render(CREATE_ARTICLE_VIEW, { user: req.user });
        },
        loadEditArticlePage(req, res) {
            common.setIsAdminUser(req, userValidator);
            let _id = req.body.articleId;
            data.getArticleById(_id)
                .then(article => res.render(EDIT_ARTICLE_VIEW, { user: req.user, article }));
        },
        loadArticlesByGenrePage(req, res) {
            let user = req.user;
            let genre = req.query.genre;
            let page = Number(req.query.page || 1);
            let pageSize = 5;

            if (user) {
                if (userValidator.isInRole(req.user, ADMIN_ROLE)) {
                    return loadArticlesByGenreForAdmin(user, req, res, genre, page, pageSize, userValidator, common, data);
                }
            }
            return loadArticlesByGenreForNormalUser(user, req, res, genre, page, pageSize, data);
        },
        loadSingleArticlePage(req, res) {
            common.setIsAdminUser(req, userValidator);
            let title = req.query.title;
            data.getArticleByTitle(title)
                .then(article => {
                    let articleComments = getArticleCommentsMapped(article);
                    res.render(SINGLE_ARTICLE_VIEW, getSingleArticleObject(article, articleComments, req.user));
                });
        },
        createArticle(req, res) {
            let articleBody = req.body.articleBody;
            let articleHeader = req.body.articleHeader;
            let articleSubHeader = req.body.articleSubHeader;
            let articleGenre = req.body.articleGenre;

            data.createArticle(articleHeader, articleSubHeader, req.user.username, articleBody, articleGenre, "")
                .then(() => res.redirect(`/articles?genre=${articleGenre}`))
                .catch(console.log);
        },
        saveEditedArticle(req, res) {
            let articleBody = req.body.articleBody;
            let articleHeader = req.body.articleHeader;
            let articleSubHeader = req.body.articleSubHeader;
            let _id = req.body.articleId;

            let update = { mainHeader: articleHeader, subHeader: articleSubHeader, body: articleBody };
            let options = { new: true };

            data.updateArticle(_id, update, options)
                .then(() => res.redirect("/"))
                .catch(console.log);
        },
        addComment(req, res) {
            let body = req.body;
            let commentToAdd = {
                content: body.content,
                author: req.user.username,
                postDate: Date.now()
            };

            data.getArticleById(body.entityId)
                .then(article => {
                    article.comments.push(commentToAdd);
                    article.save();
                    res.redirect("back");
                })
                .catch(err => res.status(500).send(err));
        },
        toggleLikeOnArticle(req, res) {
            let articleId = req.body.targetId;
            data.getArticleById(articleId)
                .then(article => {
                    for (let i = 0; i < article.usersLiked.length; i += 1) {
                        if (article.usersLiked[i].user === req.user.username) {
                            return i;
                        }
                    }
                    return -1;
                })
                .then(index => {
                    if (index !== -1) {
                        dislikeArticle(articleId, index, res, data);
                    } else {
                        likeArticle(articleId, req, res, data);
                    }
                });
        },
        deleteArticle(req, res) {
            let _id = req.body.articleId;
            let update = { deletedOn: Date.now() };
            let options = { new: true };

            data.updateArticle(_id, update, options)
                .then(() => res.redirect("back"))
                .catch(console.log);
        },
        restoreArticle(req, res) {
            let _id = req.body.articleId;
            let update = { deletedOn: null };
            let options = { new: true };

            data.updateArticle(_id, update, options)
                .then(() => res.redirect("back"))
                .catch((err) => console.log(err));
        }
    };
};