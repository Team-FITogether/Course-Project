const mongoose = require("mongoose");

const User = mongoose.model("user");
const Article = require("./../models/article");
const Exercise = require("./../models/exercise");
const Food = require("./../models/food");
const Recipe = require("./../models/recipe");
const data = require("./../data")({ User, Exercise, Food, Recipe, Article });
const constants = require("./../utils/constants");

function findUsers(username, isLoggedIn, req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    let query = { username: new RegExp(username, "i") };
    data.findUserByQueryWithSelectIdAndName(query)
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
    data.findExerciseByQueryWithSelectIdAndName(query)
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
    data.findFoodByQueryWithSelectIdAndTitle(query)
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
    data.findRecipeByQueryWithSelectIdAndTitle(query)
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
    data.findArticleByQueryWithSelectIdAndHeader(query)
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
    }
}

module.exports = {
    findEntities
};
