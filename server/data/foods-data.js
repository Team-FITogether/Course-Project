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
        getSingleFood(title) {
            return new Promise((resolve, reject) => {
                FoodDetails
                    .find({ "category": title }, (err, food) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(food);
                    });
            });
        }
    }
}
