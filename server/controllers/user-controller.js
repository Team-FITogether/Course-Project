"use strict";

const USER_PROFILE_VIEW = "user/profile";
const FOUND_USER_PROFILE_VIEW = "user/found-user-profile";
//const ADMIN_PANEL_VIEW = "admin-area/admin-panel";

function renderProfilePage(req, res, data) {
    let exercises;
    let articles;
    let foods;
    let friendships;

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
            return data.getAllFriendships(req.user.username);
        })
        .then(resultFriendships => {
            let approvedFriendships = resultFriendships.filter(el => { return el.approved; });
            let waitingForApproval = resultFriendships.filter(el => { return !el.approved && el.secondUser === req.user.username; });
            let requestedFriendships = resultFriendships.filter(el => { return !el.approved && el.firstUser === req.user.username; });
            friendships = {
                approvedFriendships,
                waitingForApproval,
                requestedFriendships
            };

            req.user.calendar.workouts.sort((a, b) => a.date > b.date ? 1 : b.date > a.date ? -1 : 0);
            req.user.calendar.menus.sort((a, b) => a.date > b.date ? 1 : b.date > a.date ? -1 : 0);
            res.render(USER_PROFILE_VIEW, {
                user: req.user,
                calendar: req.user.calendar,
                exercises,
                articles,
                foods,
                friendships
            });
        });
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

            let exercises = req.body.exercises;
            let date = new Date(req.body.date);

            let newWorkout = { date, exercises };

            data.updateWorkoutsCalendar(req.user, newWorkout)
                .then(() => res.sendStatus(200));
        },
        addMenuToUser(req, res) {
            common.setIsAdminUser(req, userValidator);
            common.setIsTrainerUser(req, userValidator);

            let meals = req.body.meals;
            let date = new Date(req.body.date);
            let totalCalories = req.body.totalCalories;
            let newMenu = { date, meals, totalCalories };
            data.updateMenusCalendar(req.user, newMenu)
                .then(() => res.sendStatus(200));
        },
        getAllUsers(req, res) {
            data.getUsernamesOfUsers().then(users => res.json(JSON.stringify(users)));
        },
        requestFriendship(req, res) {
            let firstUser = req.user.username;
            let secondUser = req.body.requestedUsername;
            let approved = false;

            let friendship = {
                firstUser,
                secondUser,
                approved
            };

            data.getSingleFriendship(firstUser, secondUser)
                .then(resultFriendship => {
                    if (!resultFriendship) {
                        return data.addNewFriendships(friendship);
                    }

                    return res.sendStatus(400);
                })
                .then(() => res.sendStatus(200));
        },
        approveFriendship(req, res) {
            let firstUser = req.body.approvedUsername;
            let secondUser = req.user.username;

            data.getSingleFriendship(firstUser, secondUser)
                .then(resultFriendship => {
                    return data.updateFriendship(resultFriendship);
                })
                .then(() => res.sendStatus(200));
        }
    };
};
