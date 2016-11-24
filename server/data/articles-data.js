/* globals require module Promise*/
"use strict";

module.exports = function(models) {
    let Article = models.Article;
    // let ExerciseExplanation = models.ExerciseExplanation;
    // let Exercise = models.Exercise;

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
        getArticlesByGenre(genre) {
            return new Promise((resolve, reject) => {
                Article
                    .find({ genre }, (err, article) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(article);
                    });
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
        // getSingleExercise(title) {
        //     return new Promise((resolve, reject) => {
        //         ExerciseExplanation
        //             .findOne({ title }, (err, explanation) => {
        //                 if (err) {
        //                     return reject(err);
        //                 }

        //                 return resolve(explanation);
        //             });
        //     });
        // }
    };
};