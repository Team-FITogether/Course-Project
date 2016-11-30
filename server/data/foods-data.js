/* globals require module Promise*/
"use strict";

// const Food = require("../models/food");
// const FoodDetails = require("../models/food-details");

module.exports = function(models) {
    let { Food, FoodDetails } = models;
    return {
        getAllFoods() {
            return new Promise((resolve, reject) => {
                Food.find((err, foods) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(foods);
                });
            });
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
        }
    };
};