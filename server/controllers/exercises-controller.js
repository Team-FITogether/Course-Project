"use strict";

const mongoose = require("mongoose");
const Exercise = require("./../models/exercise.js");

function getAllExercises(req, res) {
    Exercise
        .find()
        .then(exercises => {
            console.log(exercises);
            res.render("exercises/all-exercises", { exercises });
        });
}

module.exports = { getAllExercises };