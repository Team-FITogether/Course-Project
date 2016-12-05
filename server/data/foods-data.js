/* globals require module Promise*/
"use strict";

module.exports = function(models) {
    let { Food, FoodDetails } = models;

    return {
        getFoodById(id) {
            return new Promise((resolve, reject) => {
                Food.findOne({ _id: id }, (err, food) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(food || null);
                });
            });
        },
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
        updateFood(id, update, options) {
            return new Promise((resolve, reject) => {
                Food.findOneAndUpdate({ "_id": id }, update, options,
                    (err, food) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(food || null);
                    });
            });
        },
        addNewFood(title, details, calories, proteins, carbs, fats, category) {
            return new Promise((resolve, reject) => {
                let food = new FoodDetails({
                    title,
                    details,
                    calories,
                    proteins,
                    carbs,
                    fats,
                    category
                });


                food.save((err, createdFood) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(createdFood);
                });
            });
        },
        addNewFoodCategory(title) {
            return new Promise((resolve, reject) => {
                let category = new Food({
                    title
                });

                category.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(category);
                });
            });
        },
        getAllFoodDetailsRest() {
            return new Promise((resolve, reject) => {
                FoodDetails.find()
                    .select("title details calories")
                    .exec((err, foodDetails) => {
                        if (err) {
                            reject(err);
                        }

                        return resolve(foodDetails);
                    });
            });
        }
    };
};