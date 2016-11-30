"use strict";

// const controllers = require("../controllers");

module.exports = ({ app, controllers }) => {
    const dietsController = controllers.diets;

    app.get("/diets", dietsController.getAllDiets);
    app.get("/diets/single-diet", dietsController.getSingleDiet);

    app.post("/diets/comments/add", dietsController.addComment);
};