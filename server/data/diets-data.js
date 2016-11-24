/* globals require module Promise*/
"use strict";

module.exports = function(models) {
    let Diet = models.Diet;

    return {
        getAllDiets() {
            return new Promise((resolve, reject) => {
                Diet
                    .find((err, diets) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(diets);
                    });
            });
        },
        getSingleDiet(title) {
            return new Promise((resolve, reject) => {
                Diet
                    .findOne({ title }, (err, diet) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(diet);
                    });
            });
        }
    }
}
