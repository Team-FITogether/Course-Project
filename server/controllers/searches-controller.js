const mongoose = require("mongoose");

function findUsers(username, isLoggedIn, req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    mongoose
        .model("user")
        .where({ username: new RegExp(username, "i") })
        .select("_id username")
        .exec((err, users) => {
            if (err) {
                console.log(err);
            } else {
                res.render("searches/found-users.pug", {
                    users,
                    user
                });
            }
        });
}

function findExercises(exerciseName, isLoggedIn, req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    mongoose
        .model("exercise")
        .where({ name: new RegExp(exerciseName, "i") })
        .select("_id name")
        .exec((err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.render("searches/found-exercises.pug", {
                    exercises: data,
                    viewBag: {
                        isLoggedIn
                    }
                });
            }
        });
}

function findFoods(foodName, isLoggedIn, req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    mongoose
        .model("fooddetails")
        .where({ title: new RegExp(foodName, "i") })
        .select("_id title")
        .exec((err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.render("searches/found-foods.pug", {
                    fooddetails: data,
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

function findEntities(req, res) {
    let query = req.query;
    let entityName = query.entityName;
    let isLoggedIn = !!req.user;

    if (entityName === "users") {
        findUsers(query.searchValue, isLoggedIn, req, res);
    } else if (entityName === "exercises") {
        findExercises(query.searchValue, isLoggedIn, req, res);
    } else if (entityName === "foods") {
        findFoods(query.searchValue, isLoggedIn, req, res);
    } else if (entityName === "recipes") {
        findRecipes(query.searchValue, isLoggedIn, req, res);
    }
}

module.exports = {
    findEntities
};
