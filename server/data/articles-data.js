/* globals require module Promise*/
"use strict";

module.exports = function (models) {
    let { Article } = models;

    return {
        getArticleById(id) {
            return new Promise((resolve, reject) => {
                Article.findOne({ _id: id }, (err, article) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(article || null);
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
                        .sort({ createdOn: -1 })
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
                })
            ]);
        },
        getArticlesByGenreAdminUser(genre, page, pageSize) {
            let skip = (page - 1) * pageSize;
            let limit = pageSize;

            return Promise.all([
                new Promise((resolve, reject) => {
                    Article.find({ genre })
                        .skip(skip)
                        .limit(limit)
                        .sort({ createdOn: -1 })
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
                })
            ]);
        },
        getArticleByTitle(title) {
            return new Promise((resolve, reject) => {
                Article.findOne({ mainHeader: title }, (err, article) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(article || null);
                });
            });
        },
        getArticlesByAuthor(author) {
            return new Promise((resolve, reject) => {
                Article.find({ author })
                    .where("deletedOn")
                    .equals(null)
                    .exec((err, article) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(article);
                    });
            });
        },
        getArticlesByAuthorAdminUser(author) {
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
            let article = new Article({
                mainHeader: header,
                subHeader: subheader,
                author,
                imgSrc: img,
                genre,
                body
            });
            
            return new Promise((resolve, reject) => {
                article.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(article);
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

                        return resolve(article || null);
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
        },
        getTopLikedArticles() {
            return new Promise((resolve, reject) => {
                Article.find()
                    .sort({ "likes": -1 })
                    .limit(10)
                    .exec((err, articles) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(articles);
                    });
            });
        },
        getAllArticles() {
            return new Promise((resolve, reject) => {
                Article.find()
                    .select("mainHeader subHeader imgSrc body genre")
                    .exec((err, articles) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(articles);
                    });
            });
        }
    };
};