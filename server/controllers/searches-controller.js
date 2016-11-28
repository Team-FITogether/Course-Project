const mongoose = require("mongoose");

const User = mongoose.model("user");
const Article = require("./../models/article");
const Exercise = require("./../models/exercise");
const data = require("./../data")({ Exercise, User, Article });
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

function findFoods(foodName, isLoggedIn, req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    mongoose
        .model("foodDetails")
        .where({ title: new RegExp(foodName, "i") })
        .select("_id title details")
        .exec((err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                res.render("searches/found-foods.pug", {
                    foods: data,
                    viewBag: {
                        isLoggedIn
                    }
                });
            }
        });
}

function findRecipes(recipeName, isLoggedIn, req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    mongoose
        .model("recipe")
        .where({ title: new RegExp(recipeName, "i") })
        .select("_id title")
        .exec((err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.render("searches/found-recipes.pug", {
                    recipes: data,
                    viewBag: {
                        isLoggedIn
                    }
                });
            }
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