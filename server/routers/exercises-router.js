"use strict";

module.exports = ({ app, controllers }) => {
    const exercisesController = controllers.exercises;

    app.get("/exercises", exercisesController.getAllCategoriesOfExercise);
    app.get("/exercises/explanations", exercisesController.getSingleExercise);
    app.get("/exercises/single-exercise", exercisesController.getAllExercisesByCategory);

    app.post("/excercises/comments/add", exercisesController.addComment);
};