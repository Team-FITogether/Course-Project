"use strict";

const constants = require("./../utils/constants");

function findUsers(username, isLoggedIn, req, res, userValidator, common, data) {
    common.setIsAdminUser(req, userValidator);

    let query = { username: new RegExp(username, "i") };
    data.findUserByQueryWithSelectIdAndName(query)
        .then(users => res.render("searches/found-users.pug", { users, user: req.user }), console.log);
}

function findExercises(exerciseName, isLoggedIn, req, res, userValidator, common, data) {
    common.setIsAdminUser(req, userValidator);

    let query = { name: new RegExp(exerciseName, "i") };
    data.findExerciseByQueryWithSelectIdAndName(query)
        .then(exercises => res.render("searches/found-exercises.pug", { exercises, viewBag: { isLoggedIn } }), console.log);
}

function findFoods(foodTitle, isLoggedIn, req, res, userValidator, common, data) {
    common.setIsAdminUser(req, userValidator);

    let query = { title: new RegExp(foodTitle, "i") };
    data.findFoodByQueryWithSelectIdAndTitle(query)
        .then(foods => res.render("searches/found-foods.pug", { foods, viewBag: { isLoggedIn } }), console.log);
}

function findRecipes(recipeTitle, isLoggedIn, req, res, userValidator, common, data) {
    common.setIsAdminUser(req, userValidator);

    let query = { title: new RegExp(recipeTitle, "i") };
    data.findRecipeByQueryWithSelectIdAndTitle(query)
        .then(recipes => res.render("searches/found-recipes.pug", { recipes, viewBag: { isLoggedIn } }), console.log);
}

function findArticles(articleName, isLoggedIn, req, res, userValidator, common, data) {
    common.setIsAdminUser(req, userValidator);

    let query = { mainHeader: new RegExp(articleName, "i") };
    data.findArticleByQueryWithSelectIdAndHeader(query)
        .then(articles => res.render("searches/found-articles.pug", { articles, viewBag: { isLoggedIn } }), console.log);
}

module.exports = ({ userValidator, common, data }) => {
    return {
        findEntities(req, res) {
            let query = req.query;
            let entityName = query.entityName;
            let isLoggedIn = !!req.user;

            if (entityName === constants.users) {
                findUsers(query.searchValue, isLoggedIn, req, res, userValidator, common, data);
            } else if (entityName === constants.exercises) {
                findExercises(query.searchValue, isLoggedIn, req, res, userValidator, common, data);
            } else if (entityName === constants.foods) {
                findFoods(query.searchValue, isLoggedIn, req, res, userValidator, common, data);
            } else if (entityName === constants.recipes) {
                findRecipes(query.searchValue, isLoggedIn, req, res, userValidator, common, data);
            } else if (entityName === constants.articles) {
                findArticles(query.searchValue, isLoggedIn, req, res, userValidator, common, data);
            } else {
                res.render("error-pages/404-not-found");
            }
        }
    };
};