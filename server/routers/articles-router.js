"use strict";

const controllers = require("../controllers");

module.exports = (app, userValidator, common) => {
    const articlesController = controllers.articles(userValidator, common);

    app.get("/articles", articlesController.loadArticlesByGenrePage);
    app.get("/articles/single-article", articlesController.loadSingleArticlePage);
    app.get("/articles/create", userValidator.isTrainerUserMiddleware, userValidator.isUserLoggedIn, articlesController.loadCreateArticlePage);

    app.post("/articles/create/update", userValidator.isTrainerUserMiddleware, userValidator.isUserLoggedIn, articlesController.saveEditedArticle);
    app.post("/articles/edit", userValidator.isTrainerUserMiddleware, userValidator.isUserLoggedIn, articlesController.loadEditArticlePage);
    app.post("/articles/create/save", userValidator.isTrainerUserMiddleware, userValidator.isUserLoggedIn, articlesController.createArticle);
    app.post("/articles/comments/add", userValidator.isUserLoggedIn, articlesController.addComment);
    app.post("/articles/delete", userValidator.isUserLoggedIn, userValidator.isAdminUserMiddleware, articlesController.deleteArticle);
    app.post("/articles/restore", userValidator.isUserLoggedIn, userValidator.isAdminUserMiddleware, articlesController.restoreArticle);

    app.post("/api/articles/like", userValidator.isUserLoggedIn, articlesController.toggleLikeOnArticle);
    app.post("/api/articles", userValidator.isUserLoggedIn, articlesController.returnArticlesAsJson);
};