"use strict";

const controllers = require("../controllers");

module.exports = (app) => {
    app.get("/exercises", controllers.exercises.getAllExercises);
    app.get("/explanations", controllers.exercises.getSingleExercise);
};