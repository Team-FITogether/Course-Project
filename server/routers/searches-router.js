/* globals module */
"use strict";

module.exports = ({ app, controllers }) => {
    const searchesController = controllers.searches;

    app.get("/search", searchesController.findEntities);
};