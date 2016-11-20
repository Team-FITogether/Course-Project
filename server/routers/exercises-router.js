"use strict";

const controllers = require("../controllers");

module.exports = (app) => {
    app.get("/exercises", controllers.exercises.getAllExercises);
    app.get("/exercises/explanations", controllers.exercises.getSingleExercise);
};