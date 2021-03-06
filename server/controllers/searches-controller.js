"use strict";

const constants = require("./../utils/constants");
const FOUND_USERS_VIEW = "searches/found-users.pug";
const FOUND_EXERCISES_VIEW = "searches/found-exercises.pug";
const FOUND_FOODS_VIEW = "searches/found-foods.pug";
const FOUND_RECIPES_VIEW = "searches/found-recipes.pug";
const FOUND_ARTICLES_VIEW = "searches/found-articles.pug";
const PAGES_NOT_FOUND_VIEW = "error-pages/404-not-found";

function findUsers(username, isLoggedIn, req, res, userValidator, common, data) {
    common.setIsAdminUser(req, userValidator);

    let query = { username: new RegExp(username, "i") };
    return data.findUserByQueryWithSelectIdAndName(query)
        .then(users => {
            users.forEach(u => u.avatarName = u.avatarName || "default_profile.png");
            return res.render(FOUND_USERS_VIEW, { users, user: req.user });
        });
}

function findExercises(exerciseName, isLoggedIn, req, res, userValidator, common, data) {
    common.setIsAdminUser(req, userValidator);

    let query = { name: new RegExp(exerciseName, "i") };
    return data.findExerciseByQueryWithSelectIdAndName(query)
        .then(exercises => res.render(FOUND_EXERCISES_VIEW, { exercises, viewBag: { isLoggedIn } }));
}

function findFoods(foodTitle, isLoggedIn, req, res, userValidator, common, data) {
    common.setIsAdminUser(req, userValidator);

    let query = { title: new RegExp(foodTitle, "i") };
    return data.findFoodByQueryWithSelectIdAndTitle(query)
        .then(foods => res.render(FOUND_FOODS_VIEW, { foods, viewBag: { isLoggedIn } }), console.log);
}

function findRecipes(recipeTitle, isLoggedIn, req, res, userValidator, common, data) {
    common.setIsAdminUser(req, userValidator);

    let query = { title: new RegExp(recipeTitle, "i") };
    return data.findRecipeByQueryWithSelectIdAndTitle(query)
        .then(recipes => res.render(FOUND_RECIPES_VIEW, { recipes, viewBag: { isLoggedIn } }), console.log);
}

function findArticles(articleName, isLoggedIn, req, res, userValidator, common, data) {
    common.setIsAdminUser(req, userValidator);

    let query = { mainHeader: new RegExp(articleName, "i") };
    return data.findArticleByQueryWithSelectIdAndHeader(query)
        .then(articles => res.render(FOUND_ARTICLES_VIEW, { articles, viewBag: { isLoggedIn } }), console.log);
}

module.exports = ({ userValidator, common, data }) => {
    return {
        findEntities(req, res) {
            let query = req.query;
            let entityName = query.entityName;
            let isLoggedIn = !!req.user;

            if (entityName === constants.users) {
                return findUsers(query.searchValue, isLoggedIn, req, res, userValidator, common, data);
            } else if (entityName === constants.exercises) {
                return findExercises(query.searchValue, isLoggedIn, req, res, userValidator, common, data);
            } else if (entityName === constants.foods) {
                return findFoods(query.searchValue, isLoggedIn, req, res, userValidator, common, data);
            } else if (entityName === constants.recipes) {
                return findRecipes(query.searchValue, isLoggedIn, req, res, userValidator, common, data);
            } else if (entityName === constants.articles) {
                return findArticles(query.searchValue, isLoggedIn, req, res, userValidator, common, data);
            }

            return res.render(PAGES_NOT_FOUND_VIEW);
        }
    };
};
