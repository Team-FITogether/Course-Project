"use strict";

// const mongoose = require("mongoose");
const Exercise = require("./../models/exercise.js");
const ExerciseExplanation = require("./../models/exercise-explanation");

function getAllExercises(req, res) {
    Exercise
        .find()
        .then(exercises => {
            res.render("exercises/all-exercises", { exercises });
        });
}

function getSingleExercise(req, res) {
    let title = req.query.title;

    ExerciseExplanation
        .findOne({ title })
        .then((explanation) => {
            res.render("exercises/exercise-explanation", {
                title: explanation.title,
                content: explanation.content,
                category: explanation.category,
                author: explanation.author
            });
        });
}

module.exports = { getAllExercises, getSingleExercise };