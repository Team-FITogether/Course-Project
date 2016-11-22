const mongoose = require("mongoose");

function findUsers(username, isLoggedIn, res) {
    mongoose
        .model("user")
        .where({ username: new RegExp(username, "i") })
        .select("_id username")
        .exec((err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.render("searches/found-users.pug", {
                    users: data,
                    viewBag: {
                        isLoggedIn
                    }
                });
            }
        });
}

function findExercises(exerciseName, isLoggedIn, res) {

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
        findUsers(query.searchValue, isLoggedIn, res);
    } else if (entityName === "exercises") {
        findExercises(query.searchValue, isLoggedIn, res);
    }
}

module.exports = {
    findEntities
};