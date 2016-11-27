/* globals require module Promise*/
"use strict";

module.exports = function(models) {
    let ExerciseCategory = models.ExerciseCategory;
    let ExerciseExplanation = models.ExerciseExplanation;
    let Exercise = models.Exercise;

    return {
        getAllCategories() {
            return new Promise((resolve, reject) => {
                ExerciseCategory
                    .find((err, categories) => {
                        if (err) {
                            return reject(err);
                        }
                        
                        return resolve(categories);
                    });
            });
        },
        getSingleExercise(title) {
            return new Promise((resolve, reject) => {
                ExerciseExplanation
                    .findOne({ title }, (err, explanation) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(explanation);
                    });
            });
        },
        getAllExercisesByCategory(category) {
            return new Promise((resolve, reject) => {
                Exercise
                    .find({ "bodyPart": category }, (err, exercises) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(exercises);
                    });
            });
        },
        getAllExercises() {
            return new Promise((resolve, reject) => {
                Exercise
                    .find({}, (err, exercises) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(exercises);
                    });
            });
        },
        getExerciseExplanationById(id) {
            return new Promise((resolve, reject) => {
                ExerciseExplanation
                    .findById(id, (err, exercises) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(exercises);
                    });
            });
        }
    };
};