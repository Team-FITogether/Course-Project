"use strict";

const controllers = require("../controllers");

module.exports = (app, userValidator) => {
    app.get("/articles", controllers.articles.loadArticlesByGenrePage);
    app.get("/articles/single-article", controllers.articles.loadSingleArticlePage);
    app.get("/articles/create", userValidator.isTrainerUserMiddleware, userValidator.isUserLoggedIn, controllers.articles.loadCreateArticlePage);

    app.post("/articles/create/update", userValidator.isTrainerUserMiddleware, userValidator.isUserLoggedIn, controllers.articles.saveEditArticle);
    app.post("/articles/edit", userValidator.isTrainerUserMiddleware, userValidator.isUserLoggedIn, controllers.articles.loadEditArticlePage);
    app.post("/articles/create/save", userValidator.isTrainerUserMiddleware, userValidator.isUserLoggedIn, controllers.articles.createArticle);
    app.post("/articles/comments/add", userValidator.isUserLoggedIn, controllers.articles.addComment);
    app.post("/articles/delete", userValidator.isUserLoggedIn, userValidator.isAdminUserMiddleware, controllers.articles.deleteArticle)
    app.post("/articles/restore", userValidator.isUserLoggedIn, userValidator.isAdminUserMiddleware, controllers.articles.restoreArticle)

    app.post("/api/articles/like", userValidator.isUserLoggedIn, controllers.articles.toggleLikeOnArticle);
    app.post("/api/articles", userValidator.isUserLoggedIn, controllers.articles.returnArticlesAsJson);
};