const controllers = require("../controllers");

module.exports = (app, userValidator, common) => {
    const searchesController = controllers.searches(userValidator, common);

    app.get("/search", searchesController.findEntities);
};