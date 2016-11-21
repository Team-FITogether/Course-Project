"use strict";

const controllers = require("../controllers");

module.exports = (app) => {
    app.get("/diets", controllers.diets.getAllDiets);
    app.get("/diets/single-diet", controllers.diets.getSingleDiet);
};