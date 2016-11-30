"use strict";

const controllers = require("../controllers");

module.exports = (app, userValidator, common) => {
    const exercisesController = controllers.exercises(userValidator, common);

    app.get("/exercises", exercisesController.getAllCategoriesOfExercise);
    app.get("/exercises/explanations", exercisesController.getSingleExercise);
    app.get("/exercises/single-exercise", exercisesController.getAllExercisesByCategory);

    app.post("/excercises/comments/add", exercisesController.addComment);
};