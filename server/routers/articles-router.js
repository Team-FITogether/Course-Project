"use strict";

const controllers = require("../controllers");

module.exports = (app, userValidator) => {
    app.get("/articles", controllers.articles.loadArticlesByGenrePage);
    app.get("/single-article", controllers.articles.loadSingleArticlePage);
    app.get("/articles/create", userValidator.isTrainerUserMiddleware, userValidator.isUserLoggedIn, controllers.articles.loadCreateArticlePage);

    app.post("/articles/create/save", userValidator.isTrainerUserMiddleware, userValidator.isUserLoggedIn, controllers.articles.createArticle);
    app.post("/articles/comments/add", controllers.articles.addComment);
};