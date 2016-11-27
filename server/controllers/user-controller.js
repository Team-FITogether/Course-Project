"use strict";

const mongoose = require("mongoose");
const User = mongoose.model("user");
const Article = require("./../models/article");

const Calendar = require("./../models/calendar");
const CalendarData = require("./../data")({ Calendar });

const Exercise = require("../models/exercise");
const ExerciseData = require("./../data")({ Exercise });

function getAllUsers(req, res) {
    User
        .where()
        .select("username")
        .exec((err, users) => {
            res.json(JSON.stringify(users));
        });
}

function loadAdminPannel(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    User
        .where()
        .select("username")
        .exec((err, data) => {
            let users = data.map(u => u.username);
            res.render("admin-area/admin-pannel", { user, users });
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

    User.findOneAndUpdate(query, updateObject, (err, us) => {
        if (!us) {
            // TODO error handlig preferably with AJAX
            // viewBag.error = `No user named ${body.username} was found.`;
            return res.render("admin-area/admin-pannel", { user });
        }

        if (err) {
            // TODO error handlig preferably with AJAX
            // viewBag.error = err;
            console.log(err, us);
            res.render("admin-area/admin-pannel", { user });
        } else {
            // TODO error handlig preferably with AJAX
            // viewBag.successMessage = `Role ${body.role} was succesfully set to user ${us.username}.`;
            console.log("success");
            res.render("admin-area/admin-pannel", { user });
        }
    });
}

function loadProfilePage(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
        user.isTrainer = req.user.roles.indexOf("trainer") !== -1;
    }

    res.render("user/profile", {
                user
            });
}

function loadFoundUserProfilePage(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    if (req.query.username) {
        User
            .findOne({ username: req.query.username })
            .then(foundUser => {
                res.render("user/found-user-profile", {
                    foundUser,
                    user
                });
            })
            .catch(console.log);
    }
    else if (req.query.id) {
        User
            .findOne({ _id: req.query.id })
            .then(foundUser => {
                res.render("user/found-user-profile", {
                    foundUser,
                    user
                });
            })
            .catch(console.log);
    }
}

function loadUserCallendar(req, res){
    let user = req.user;
    let exercises;

    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
        user.isTrainer = req.user.roles.indexOf("trainer") !== -1;
    }

    ExerciseData
        .getAllExercises()
        .then(allExercises => {
            exercises = allExercises;
            return Promise.resolve();
        })
        .then(() =>{
            return CalendarData.getCalendarByUser(user.username)
        })
        .then(calendar => {
            if(!calendar){
                CalendarData.createCalendar(user.username)
                    .then(newCalendar => {
                        calendar = newCalendar;
                        res.render("user/profile-calendar", {
                        user,
                        calendar,
                        exercises
                    });
                })
            } else {
                res.render("user/profile-calendar", {
                    user,
                    calendar,
                    exercises
                });
            }
    })
    
}

function loadUserArticles(req, res){
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
        user.isTrainer = req.user.roles.indexOf("trainer") !== -1;
    }

    let author = req.user.username;
    Article.find({ author })
        .then(articles => {
            res.render("user/profile-articles", {
                user,
                articles
            });
        });
}

function AddWorkout(req, res){
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
        exercises: exercises
    }

    CalendarData.updateCalendar(user.username, { $push: { "workouts": newWorkout } }, true)
        .then(calendar => {
            return res.redirect("/users/profile")
        })
}
module.exports = {
    loadAdminPannel,
    loadProfilePage,
    loadFoundUserProfilePage,
    loadUserCallendar,
    loadUserArticles,
    AddWorkout,
    getAllUsers,
    addRole
};