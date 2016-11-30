/* globals require module Promise*/
"use strict";

const Diet = require("../models/diet");

module.exports = {
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

                return resolve(diet);
            });
        });
    },
    getDietById(id) {
        return new Promise((resolve, reject) => {
            Diet.findOne({ "_id": id }, (err, diet) => {
                if (err) {
                    return reject(err);
                }

                return resolve(diet);
            });
        });
    },
    updateDiet(id, update, options) {
        return new Promise((resolve, reject) => {
            Diet.findOneAndUpdate({ "_id": id }, update, options,
                (err, diet) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(diet);
                });
        });
    }
};
