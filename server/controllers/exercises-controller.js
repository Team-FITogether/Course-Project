"use strict";

const Exercise = require("./../models/exercise.js");
const ExerciseExplanation = require("./../models/exercise-explanation");
const viewBagUtil = require("./../utils/view-bag");

function getAllExercises(req, res) {
    let viewBag = viewBagUtil.getViewBag(req);
    Exercise
        .find()
        .then(exercises => {
            return res.render("exercises/all-exercises", { exercises, viewBag });
        })
        .catch(console.log);
}

function getSingleExercise(req, res) {
    let title = req.query.title;
    let viewBag = viewBagUtil.getViewBag(req);

    ExerciseExplanation
        .findOne({ title })
        .then((explanation) => {
            res.render("exercises/exercise-explanation", {
                title: explanation.title,
                content: explanation.content,
                category: explanation.category,
                author: explanation.author,
                viewBag
            });
        });
}

module.exports = { getAllExercises, getSingleExercise };