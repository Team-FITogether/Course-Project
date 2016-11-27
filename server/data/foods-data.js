/* globals require module Promise*/
"use strict";

module.exports = function(models) {
    let Food = models.Food;
    let FoodDetails = models.FoodDetails;

    return {
        getAllFoods() {
            return new Promise((resolve, reject) => {
                Food
                    .find((err, foods) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(foods);
                    });
            });
        },
        getSingleFood(title, details) {
            return new Promise((resolve, reject) => {
                FoodDetails
                    .findOne({ "title": title, "details": details }, (err, food) => {
                        if (err) {
                            return reject(err);
                        }
                        console.log(food);
                        return resolve(food);
                    });
            });
        },
        getFoodByCategory(category) {
            return new Promise((resolve, reject) => {
                FoodDetails
                    .find({ "category": category }, (err, food) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(food);
                    });
            });
        }
    }
}
