"use strict";

const constants = require("./../utils/constants");

const userData = require("./../data/user-data");
const exerciseData = require("./../data/exercises-data");
const foodData = require("./../data/foods-data");
const recipeData = require("./../data/recipes-data");
const articleData = require("./../data/articles-data");

function findUsers(username, isLoggedIn, req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    let query = { username: new RegExp(username, "i") };
    userData.findUserByQueryWithSelectIdAndName(query)
        .then(users => {
            res.render("searches/found-users.pug", {
                users,
                user
            });
        }, err => {
            console.log(err);
        });
}

function findExercises(exerciseName, isLoggedIn, req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    let query = { name: new RegExp(exerciseName, "i") };
    exerciseData.findExerciseByQueryWithSelectIdAndName(query)
        .then(exercises => {
            res.render("searches/found-exercises.pug", {
                exercises,
                viewBag: {
                    isLoggedIn
                }
            });
        }, err => {
            console.log(err);
        });
}

function findFoods(foodTitle, isLoggedIn, req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    let query = { title: new RegExp(foodTitle, "i") };
    foodData.findFoodByQueryWithSelectIdAndTitle(query)
        .then(foods => {
            res.render("searches/found-foods.pug", {
                foods,
                viewBag: {
                    isLoggedIn
                }
            });
        }, err => {
            console.log(err);
        });
}

function findRecipes(recipeTitle, isLoggedIn, req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    let query = { title: new RegExp(recipeTitle, "i") };
    recipeData.findRecipeByQueryWithSelectIdAndTitle(query)
        .then(recipes => {
            res.render("searches/found-recipes.pug", {
                recipes,
                viewBag: {
                    isLoggedIn
                }
            });
        }, err => {
            console.log(err);
        });
}

function findArticles(articleName, isLoggedIn, req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    let query = { mainHeader: new RegExp(articleName, "i") };
    articleData.findArticleByQueryWithSelectIdAndHeader(query)
        .then(articles => {
            res.render("searches/found-articles.pug", {
                articles,
                viewBag: {
                    isLoggedIn
                }
            });
        }, err => {
            console.log(err);
        });
}

function findEntities(req, res) {
    let query = req.query;
    let entityName = query.entityName;
    let isLoggedIn = !!req.user;

    if (entityName === constants.users) {
        findUsers(query.searchValue, isLoggedIn, req, res);
    } else if (entityName === constants.exercises) {
        findExercises(query.searchValue, isLoggedIn, req, res);
    } else if (entityName === constants.foods) {
        findFoods(query.searchValue, isLoggedIn, req, res);
    } else if (entityName === constants.recipes) {
        findRecipes(query.searchValue, isLoggedIn, req, res);
    } else if (entityName === constants.articles) {
        findArticles(query.searchValue, isLoggedIn, req, res);
    } else {
        res.render("error-pages/404-not-found");
    }
}

module.exports = {
    findEntities
};