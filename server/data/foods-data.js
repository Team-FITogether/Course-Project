/* globals require module Promise*/
"use strict";

// const Food = require("../models/food");
// const FoodDetails = require("../models/food-details");

module.exports = function(models) {
    let { Food, FoodDetails } = models;
    return {
        getAllFoods(page, pageSize) {
            let skip = (page - 1) * pageSize;
            let limit = pageSize;

            return Promise.all([
                new Promise((resolve, reject) => {
                    Food.find({})
                        .skip(skip)
                        .limit(limit)
                        .exec((err, foods) => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(foods);
                        });
                }),
                new Promise((resolve, reject) => {
                    Food.count()
                        .exec((err, count) => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(count);
                        });
                })
            ]);

        },
        getAllFoodDetails() {
            return new Promise((resolve, reject) => {
                FoodDetails.find((err, foods) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(foods);
                });
            });
        },
        getSingleFood(title, details) {
            return new Promise((resolve, reject) => {
                FoodDetails.findOne({ title, details }, (err, food) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(food);
                });
            });
        },
        getFoodByCategory(category) {
            return new Promise((resolve, reject) => {
                FoodDetails.find({ category }, (err, food) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(food);
                });
            });
        },
        findFoodByQueryWithSelectIdAndTitle(query) {
            return new Promise((resolve, reject) => {
                FoodDetails.find(query)
                    .select("_id title details")
                    .exec((err, foods) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(foods);
                    });
            });
        },
        addNewFoodCategory(title) {
            return new Promise((resolve, reject) => {
                let category = new Food({
                    title
                });

                category.save((err, createdCategory) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(createdCategory);
                });
            });
        }
    };
};
