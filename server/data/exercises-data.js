/* globals require module Promise*/
"use strict";

module.exports = function(models) {
    let {
        ExerciseCategory,
        ExerciseExplanation,
        Exercise
    } = models;

    return {
        getSingleExercise(title) {
            return new Promise((resolve, reject) => {
                ExerciseExplanation.findOne({ title }, (err, explanation) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(explanation || null);
                });
            });
        },
        getAllCategories() {
            return new Promise((resolve, reject) => {
                ExerciseCategory.find((err, categories) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(categories || null);
                });
            });
        },
        getAllExercisesByCategory(category) {
            return new Promise((resolve, reject) => {
                Exercise.find({ "bodyPart": category }, (err, exercises) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(exercises);
                });
            });
        },
        getAllExercises() {
            return new Promise((resolve, reject) => {
                Exercise.find({}, (err, explanation) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(explanation);
                });
            });
        },
        getExerciseExplanationById(id) {
            return new Promise((resolve, reject) => {
                ExerciseExplanation.findById(id, (err, exercise) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(exercise || null);
                });
            });
        },
        findExerciseByQueryWithSelectIdAndName(query) {
            return new Promise((resolve, reject) => {
                Exercise.find(query)
                    .select("_id name")
                    .exec((err, exercises) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(exercises);
                    });
            });
        },
        addNewCategory(name) {
            return new Promise((resolve, reject) => {
                let category = new ExerciseCategory({
                    name
                });

                category.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(category);
                });
            });
        }
    };
};