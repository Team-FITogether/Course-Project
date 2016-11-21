"use strict";

const controllers = require("../controllers");

module.exports = (app) => {
    app.get("/exercises", controllers.exercises.getAllExercises);
    app.get("/exercises/explanations", controllers.exercises.getSingleExercise);

    app.post("/excercises/comments/add", controllers.exercises.addComment);
};