"use strict";

const controllers = require("../controllers");

module.exports = (app, userValidator) => {
    const dietsController = controllers.diets(userValidator);

    app.get("/diets", dietsController.getAllDiets);
    app.get("/diets/single-diet", dietsController.getSingleDiet);

    app.post("/diets/comments/add", dietsController.addComment);
};