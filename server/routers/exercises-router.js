"use strict";

const controllers = require("../controllers");

module.exports = (app) => {
    app.get("/exercises", controllers.exercises.getAllCategoriesOfExercise);
    app.get("/exercises/explanations", controllers.exercises.getSingleExercise);
    app.get("/exercises/single-exercise", controllers.exercises.getAllExercisesByCategory);
    app.post("/excercises/comments/add", controllers.exercises.addComment);
};