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

function findEntities(req, res) {
    let query = req.query;
    let entityName = query.entityName;
    let isLoggedIn = !!req.user;
    console.log(entityName);

    if (entityName === "users") {
        findUsers(query.searchValue, isLoggedIn, req, res);
    } else if (entityName === "exercises") {
        findExercises(query.searchValue, isLoggedIn, req, res);
    }
}

module.exports = {
    findEntities
};