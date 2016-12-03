/* globals require module Promise*/
"use strict";

module.exports = function(models) {
    let { Diet } = models;

    return {
        getDietById(id) {
            return new Promise((resolve, reject) => {
                Diet.findOne({ _id: id }, (err, diet) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(diet || null);
                });
            });
        },
        getAllDiets(page, pageSize) {
            let skip = (page - 1) * pageSize;
            let limit = pageSize;

            return Promise.all([
                new Promise((resolve, reject) => {
                    Diet.find({})
                        .skip(skip)
                        .limit(limit)
                        .exec((err, diets) => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(diets);
                        });
                }),
                new Promise((resolve, reject) => {
                    Diet.count()
                        .exec((err, count) => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(count);
                        });
                })
            ]);
        },
        getSingleDiet(title) {
            return new Promise((resolve, reject) => {
                Diet.findOne({ title }, (err, diet) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(diet || null);
                });
            });
        },
        addNewDiet(title, content) {
            return new Promise((resolve, reject) => {
                let diet = new Diet({
                    title,
                    body: content
                });

                diet.save((err, createdDiet) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(createdDiet);
                });
            });
        },
        getAllDietsRest() {
            return new Promise((resolve, reject) => {
                Diet.find()
                    .select("title body")
                    .exec((err, diets) => {
                        if (err) {
                            reject(err);
                        }

                        resolve(diets);
                    });
            });
        }
    };
};