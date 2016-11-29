"use strict";

const userData = require("./../data/user-data");
const exerciseData = require("./../data/exercises-data");
const calendarData = require("./../data/calendars-data");
const articlesData = require("./../data/articles-data");

const ADMIN = "admin";
const TRAINER = "trainer";

function setIsAdminUser(req, userValidator) {
    if (req.user) {
        req.user.isAdmin = userValidator.isInRole(req.user, ADMIN);
    }
}

function setIsTrainerUser(req, userValidator) {
    if (req.user) {
        req.user.isTrainer = userValidator.isInRole(req.user, TRAINER);
    }
}

function renderNewCalendar(req, res, exercises, articles) {
    calendarData.createCalendar(req.user.username)
        .then(newCalendar => {
            res.render("user/profile", {
                user: req.user,
                calendar: newCalendar,
                exercises,
                articles
            });
        });
}

function renderExistingCalendar(resultCalendar, exercises, articles, req, res) {
    resultCalendar.workouts.sort((a, b) => a.date > b.date ? 1 : b.date > a.date ? -1 : 0);
    res.render("user/profile", {
        user: req.user,
        calendar: resultCalendar,
        exercises,
        articles
    });
}

function renderProfilePage(req, res) {
    let exercises;
    let articles;

    exerciseData.getAllExercises()
        .then(resultExercises => {
            exercises = resultExercises;
            return articlesData.getArticlesByAuthor(req.user.username);
        })
        .then(resultAricles => {
            articles = resultAricles;
            return calendarData.getCalendarByUser(req.user.username);
        })
        .then(resultCalendar => {
            if (!resultCalendar) {
                renderNewCalendar(req, res, exercises, articles);
            } else {
                renderExistingCalendar(resultCalendar, exercises, articles, req, res);
            }
        })
        .catch(console.log);
}

function renderFoundUserByUsername(username, res, req) {
    userData.getUserByUsername(username)
        .then(foundUser => {
            res.render("user/found-user-profile", {
                foundUser,
                user: req.user
            });
        })
        .catch(console.log);
}

function renderFoundUserById(id, req, res) {
    userData.getUserById(id)
        .then(foundUser => {
            res.render("user/found-user-profile", {
                foundUser,
                user: req.user
            });
        })
        .catch(console.log);
}

module.exports = userValidator => {
    return {
        loadAdminPanel(req, res) {
            setIsAdminUser(req, userValidator);
            userData.getUsernamesOfUsers()
                .then(users => res.render("admin-area/admin-panel", { user: req.user, mappedUsers: users }));
        },
        loadProfilePage(req, res) {
            setIsAdminUser(req, userValidator);
            setIsTrainerUser(req, userValidator);
            renderProfilePage(req, res);
        },
        loadFoundUserProfilePage(req, res) {
            let username = req.query.username;
            let id = req.query.id;
            setIsAdminUser(req, userValidator);

            if (username) {
                renderFoundUserByUsername(username, req, res);
            } else if (id) {
                renderFoundUserById(id, req, res);
            }
        },
        addWorkoutToUser(req, res) {
            setIsAdminUser(req, userValidator);
            setIsTrainerUser(req, userValidator);

            let exercises = [req.body.exerciseOne, req.body.exerciseTwo, req.body.exerciseThree, req.body.exerciseFour];
            let date = req.body.date;

            let newWorkout = { date, exercises };

            calendarData.updateCalendar(req.user.username, { $push: { "workouts": newWorkout } }, true)
                .then(() => res.sendStatus(200));
        },
        addMenuToUser(req, res) {
            setIsAdminUser(req, userValidator);
            setIsTrainerUser(req, userValidator);
        },
        getAllUsers(req, res) {
            userData.getUsernamesOfUsers().then(users => res.json(JSON.stringify(users)));
        },
        addRole(req, res) {
            setIsAdminUser(req, userValidator);
            let query = { username: req.body.username };
            let updateObject = { $push: { "roles": req.body.role } };

            userData.findUserAndUpdate(query, updateObject)
                .then((foundUser) => {
                    // Handle the case where there isn't found user
                    res.render("admin-area/admin-panel", { user: req.user });
                }, error => {
                    // Handle error
                    res.render("admin-area/admin-panel", { user: req.user });
                });
        },
        addNewExerciseCategory(req, res) {
            let category = req.body.category;

            exerciseData.addNewCategory(category)
                .then((createdCategory) => {
                    console.log(`Created ${createdCategory}`);
                    res.render("admin-area/admin-panel");
                });
        }
    };
};