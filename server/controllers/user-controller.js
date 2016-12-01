"use strict";

const USER_PROFILE_VIEW = "user/profile";
const FOUND_USER_PROFILE_VIEW = "user/found-user-profile";
const ADMIN_PANEL_VIEW = "admin-area/admin-panel";

function renderNewCalendar(req, res, exercises, articles, foods, data) {
    data.createCalendar(req.user.username)
        .then(newCalendar => {
            res.render(USER_PROFILE_VIEW, {
                user: req.user,
                calendar: newCalendar,
                exercises,
                articles,
                foods
            });
        });
}

function renderExistingCalendar(resultCalendar, exercises, articles, foods, req, res) {
    resultCalendar.workouts.sort((a, b) => a.date > b.date ? 1 : b.date > a.date ? -1 : 0);
    res.render(USER_PROFILE_VIEW, {
        user: req.user,
        calendar: resultCalendar,
        exercises,
        articles,
        foods
    });
}

function renderProfilePage(req, res, data) {
    let exercises;
    let articles;
    let foods;

    data.getAllExercises()
        .then(resultExercises => {
            exercises = resultExercises;
            return data.getArticlesByAuthor(req.user.username);
        })
        .then(resultAricles => {
            articles = resultAricles;
            return data.getAllFoodDetails();
        })
        .then(resultFoods => {
            foods = resultFoods;
            return data.getCalendarByUser(req.user.username);
        })
        .then(resultCalendar => {
            if (!resultCalendar) {
                renderNewCalendar(req, res, exercises, articles, foods, data);
            } else {
                renderExistingCalendar(resultCalendar, exercises, articles, foods, req, res);
            }
        })
        .catch(console.log);
}

function renderFoundUserByUsername(username, res, req, data) {
    data.getUserByUsername(username)
        .then(foundUser => {
            res.render(FOUND_USER_PROFILE_VIEW, {
                foundUser,
                user: req.user
            });
        })
        .catch(console.log);
}

function renderFoundUserById(id, req, res, data) {
    data.getUserById(id)
        .then(foundUser => {
            res.render(FOUND_USER_PROFILE_VIEW, {
                foundUser,
                user: req.user
            });
        })
        .catch(console.log);
}

module.exports = ({ userValidator, common, data }) => {
    return {
        loadAdminPanel(req, res) {
            common.setIsAdminUser(req, userValidator);
            data.getUsernamesOfUsers()
                .then(users => res.render(ADMIN_PANEL_VIEW, { user: req.user, mappedUsers: users }));
        },
        loadProfilePage(req, res) {
            common.setIsAdminUser(req, userValidator);
            common.setIsTrainerUser(req, userValidator);
            renderProfilePage(req, res, data);
        },
        loadFoundUserProfilePage(req, res) {
            let username = req.query.username;
            let id = req.query.id;
            common.setIsAdminUser(req, userValidator);

            if (username) {
                renderFoundUserByUsername(username, req, res, data);
            } else if (id) {
                renderFoundUserById(id, req, res, data);
            }
        },
        addWorkoutToUser(req, res) {
            common.setIsAdminUser(req, userValidator);
            common.setIsTrainerUser(req, userValidator);

            let exercises = [req.body.exerciseOne, req.body.exerciseTwo, req.body.exerciseThree, req.body.exerciseFour];
            let date = req.body.date;

            let newWorkout = { date, exercises };

            data.updateCalendar(req.user.username, { $push: { "workouts": newWorkout } }, true)
                .then(() => res.sendStatus(200));
        },
        addMenuToUser(req, res) {
            common.setIsAdminUser(req, userValidator);
            common.setIsTrainerUser(req, userValidator);
        },
        getAllUsers(req, res) {
            data.getUsernamesOfUsers().then(users => res.json(JSON.stringify(users)));
        },
        addRole(req, res) {
            common.setIsAdminUser(req, userValidator);
            let query = { username: req.body.username };
            let updateObject = { $push: { "roles": req.body.role } };

            data.findUserAndUpdate(query, updateObject)
                .then((foundUser) => {
                    // Handle the case where there isn't found user
                    res.render(ADMIN_PANEL_VIEW, { user: req.user });
                }, error => {
                    // Handle error
                    res.render(ADMIN_PANEL_VIEW, { user: req.user });
                });
        },
        addNewExerciseCategory(req, res) {
            let category = req.body.category;

            data.addNewCategory(category)
                .then((createdCategory) => {
                    console.log(`Created ${createdCategory}`);
                    res.render(ADMIN_PANEL_VIEW);
                });
        }
    };
};
