/* globals require module Promise*/
"use strict";

const Article = require("../models/article");

module.exports = {
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
                Article.find({ genre })
                    .where("deletedOn")
                    .equals(null)
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
                Article.count({ genre })
                    .exec((err, count) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(count);
                    });
            })
        ]);
    },
    getArticlesByGenreAdminUser(genre, page, pageSize) {
        // returns all Articles INCLUDING deleted ones
        let skip = (page - 1) * pageSize;
        let limit = pageSize;

        return Promise.all([
            new Promise((resolve, reject) => {
                Article.find({ genre })
                    .skip(skip)
                    .limit(limit)
                    .exec((err, articles) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(articles);
                    });
            }),
            new Promise((resolve, reject) => {
                Article.count({ genre })
                    .exec((err, count) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(count);
                    });
            })]);
    },
    getArticleByTitle(title) {
        return new Promise((resolve, reject) => {
            Article.findOne({ mainHeader: title }, (err, article) => {
                if (err) {
                    return reject(err);
                }

                return resolve(article);
            });
        });
    },
    getArticlesByAuthor(author) {
        return new Promise((resolve, reject) => {
            Article.find({ author }, (err, article) => {
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
    },
    findArticleByQueryWithSelectIdAndHeader(query) {
        return new Promise((resolve, reject) => {
            Article.find(query)
                .select("_id mainHeader")
                .exec((err, articles) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(articles);
                });
        });
    }
};