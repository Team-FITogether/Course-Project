"use strict";

module.exports = ({ app, userValidator, controllers }) => {
    const dietsController = controllers.diets;

    app.get("/diets", userValidator.isUserLoggedIn, userValidator.isAdminUserMiddleware, dietsController.getAllDiets);
    app.get("/diets/single-diet", userValidator.isUserLoggedIn, userValidator.isAdminUserMiddleware, dietsController.getSingleDiet);

    app.post("/diets/edit", userValidator.isUserLoggedIn, userValidator.isAdminUserMiddleware, dietsController.loadEditDietPage);
    app.post("/diets/create/update", userValidator.isTrainerUserMiddleware, userValidator.isUserLoggedIn, dietsController.saveEditedDiet);
    app.post("/diets/create/save", userValidator.isTrainerUserMiddleware, userValidator.isUserLoggedIn, dietsController.createDiet);
    app.post("/diets/delete", userValidator.isUserLoggedIn, userValidator.isAdminUserMiddleware, dietsController.deleteDiet);
    app.post("/diets/restore", userValidator.isUserLoggedIn, userValidator.isAdminUserMiddleware, dietsController.restoreDiet);
    app.post("/diets/comments/add", dietsController.addComment);

    app.get("/api/diets", dietsController.getAllDietsRest);
};