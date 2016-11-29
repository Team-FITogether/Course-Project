"use strict";

const User = require("./../models/user");
const Article = require("./../models/article");
const Calendar = require("./../models/calendar");
const Exercise = require("../models/exercise");

const data = require("./../data")({ Exercise, User, Calendar, Article });

function getAllUsers(req, res) {
    data.getUsernamesOfUsers()
        .then((users) => {
            res.json(JSON.stringify(users));
        });
}

function loadAdminPannel(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    data.getUsernamesOfUsers()
        .then((users) => {
            let mappedUsers = users.map(u => u.username);
            res.render("admin-area/admin-pannel", { user, mappedUsers });
        });
}

function addRole(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    let body = req.body;
    let query = { username: body.username };
    let updateObject = { $push: { "roles": body.role } };

    data.findUserAndUpdate(query, updateObject)
        .then((foundUser) => {
            if (!foundUser) {
                // TODO error handlig preferably with AJAX
                // viewBag.error = `No user named ${body.username} was found.`;
                return res.render("admin-area/admin-pannel", { user });
            }
            // TODO error handlig preferably with AJAX
            // viewBag.successMessage = `Role ${body.role} was succesfully set to user ${us.username}.`;

            res.render("admin-area/admin-pannel", { user });

        }, err => {

            // TODO error handlig preferably with AJAX
            // viewBag.error = err;

            res.render("admin-area/admin-pannel", { user });

        });
}

function loadProfilePage(req, res) {
    let user = req.user;
    let calendar;
    let articles;
    let exercises;
    
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
        user.isTrainer = req.user.roles.indexOf("trainer") !== -1;
    }

    data.getAllExercises()
        .then(resultExercises => {
                exercises = resultExercises;
                return data.getArticlesByAuthor(user.username)
        })
        .then(resultAricles => {
            articles = resultAricles;
            return data.getCalendarByUser(user.username)
        })
        .then(resultCalendar => {
            if (!resultCalendar) {
                data.createCalendar(user.username)
                    .then(newCalendar => {
                        calendar = newCalendar;
                        res.render("user/profile", {
                            user,
                            calendar,
                            exercises,
                            articles
                        });
                    });
            } else {
                calendar = resultCalendar;
                res.render("user/profile", {
                    user,
                    calendar,
                    exercises,
                    articles
                });
            }
        })
        .catch(console.log);
}

function loadFoundUserProfilePage(req, res) {
    let user = req.user;
    let username = req.query.username;
    let id = req.query.id;

    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    if (username) {
        data.getUserByUsername(username)
            .then(foundUser => {
                res.render("user/found-user-profile", {
                    foundUser,
                    user
                });
            })
            .catch(console.log);
    } else if (id) {
        data.getUserById(id)
            .then(foundUser => {
                res.render("user/found-user-profile", {
                    foundUser,
                    user
                });
            })
            .catch(console.log);
    }
}

function AddWorkout(req, res) {
    let user = req.user;
    let body = req.body;

    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
        user.isTrainer = req.user.roles.indexOf("trainer") !== -1;
    }
    let exercises = [];

    exercises.push(body.exerciseOne);
    exercises.push(body.exerciseTwo);
    exercises.push(body.exerciseThree);
    exercises.push(body.exerciseFour);

    let newWorkout = {
        date: new Date(body.date),
        exercises
    };

    data.updateCalendar(user.username, { $push: { "workouts": newWorkout } }, true)
        .then(calendar => {
            return res.redirect("back");
        });
}


module.exports = {
    loadAdminPannel,
    loadProfilePage,
    loadFoundUserProfilePage,
    AddWorkout,
    getAllUsers,
    addRole
};