"use strict";

module.exports = ({ app, controllers }) => {
    const homeController = controllers.home;

    app.get("/", homeController.loadHomePage);
};