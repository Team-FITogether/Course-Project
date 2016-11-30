// const controllers = require("../controllers");

module.exports = ({ app, controllers }) => {
    const searchesController = controllers.searches;

    app.get("/search", searchesController.findEntities);
};