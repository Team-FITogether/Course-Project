/* globals require module Promise*/
"use strict";

module.exports = function (models) {
    let Article = models.Article;
    return {
        getArticleById(id) {
            return new Promise((resolve, reject) => {
                Article.findOne({ "_id": id }, (err, article) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(article);
                });
            });
        },
        getArticlesByGenre(genre, page, pageSize) {
            let skip = (page - 1) * pageSize;
            let limit = pageSize;

            return Promise.all([
                new Promise((resolve, reject) => {
                    Article
                        .find({ genre })
                        .where("deletedOn").equals(null)
                        .skip(skip)
                        .limit(limit)
                        .exec((err, articles) => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(articles);
                        })
                }),
                new Promise((resolve, reject) => {
                    Article
                        .count({ genre })
                        .exec((err, count) => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(count);
                        });
                })]);
        },
        getArticlesByGenreAdminUser(genre) {
            // returns all Articles INCLUDING deleted ones
            return new Promise((resolve, reject) => {
                Article
                    .find({ genre })
                    .exec((err, article) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(article);
                    })
            });
        },
        getArticleByTitle(title) {
            return new Promise((resolve, reject) => {
                Article
                    .findOne({ mainHeader: title }, (err, article) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(article);
                    });
            });
        },
        createArticle(header, subheader, author, body, genre, img) {
            return new Promise((resolve, reject) => {
                let article = new Article({
                    mainHeader: header,
                    subHeader: subheader,
                    author,
                    imgSrc: img,
                    genre,
                    body
                });

                article.save((err, createdArticle) => {
                    if (err) {
                        return reject(err);
                        // req.redirect("/");
                    }

                    return resolve(createdArticle);
                });
            });
        },
        updateArticle(id, update, options) {
            return new Promise((resolve, reject) => {
                Article.findOneAndUpdate({ "_id": id }, update, options,
                    (err, article) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(article);
                    });
            });
        }
    };
};