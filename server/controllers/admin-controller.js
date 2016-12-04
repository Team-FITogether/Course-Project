"use strict";
let logger = require("./../utils/logger");

const ADMIN_PANEL_VIEW = "admin-area/admin-panel";

module.exports = ({ userValidator, common, data }) => {
    return {
        loadAdminPanel(req, res) {
            let foods;

            common.setIsAdminUser(req, userValidator);
            return data.getAllFoods()
                .then((resultFoods) => {
                    foods = resultFoods;
                    return data.getUsernamesOfUsers();
                })
                .then((users) => {
                    res.render(ADMIN_PANEL_VIEW, {
                        user: req.user,
                        mappedUsers: users,
                        foods
                    });
                });
        },
        addRole(req, res) {
            common.setIsAdminUser(req, userValidator);
            let query = { username: req.body.username };
            let updateObject = { $push: { "roles": req.body.role } };
            let foods;

            return data.getAllFoods()
                .then((resultFoods) => {
                    foods = resultFoods;
                    return data.findUserAndUpdate(query, updateObject);
                })
                .then(() => {
                    logger.log("info", `Admin user - ${req.user.username}, added role ${req.body.role}, to user - ${req.body.username}`, { meta: { query, updateObject } });

                    res.render(ADMIN_PANEL_VIEW, {
                        user: req.user,
                        foods
                    });
                });
        },
        addNewExerciseCategory(req, res) {
            let category = req.body.category;
            let foods;

            return data.getAllFoods()
                .then((resultFoods) => {
                    foods = resultFoods;
                    return data.addNewCategory(category);
                })
                .then(() => {
                    logger.log("info", `Admin user - ${req.user.username}, invoked addNewExerciseCategory with result`, { meta: { category } });

                    res.render(ADMIN_PANEL_VIEW, { foods });
                });
        },
        addNewFoodCategory(req, res) {
            let category = req.body.category;
            let foods;

            return data.getAllFoods()
                .then((resultFoods) => {
                    foods = resultFoods;
                    return data.addNewFoodCategory(category);
                })
                .then(() => {
                    logger.log("info", `Admin user - ${req.user.username}, invoked addNewFoodCategory with result`, { meta: { category } });

                    res.render(ADMIN_PANEL_VIEW, { foods });
                });
        },
        addNewRecipe(req, res) {
            let title = req.body.title;
            let content = req.body.content;
            let foods;

            return data.getAllFoods()
                .then((resultFoods) => {
                    foods = resultFoods;
                    return data.addNewRecipe(title, content);
                })
                .then(() => {
                    logger.log("info", `Admin user - ${req.user.username}, invoked addNewRecipe with result`, { meta: { title, content } });

                    res.render(ADMIN_PANEL_VIEW, { foods });
                });
        },
        addNewDiet(req, res) {
            let title = req.body.title;
            let content = req.body.content;
            let foods;

            return data.getAllFoods()
                .then((resultFoods) => {
                    foods = resultFoods;
                    return data.addNewDiet(title, content);
                })
                .then(() => {
                    logger.log("info", `Admin user - ${req.user.username}, invoked addNewDiet with result`, { meta: { title, content } });

                    res.render(ADMIN_PANEL_VIEW, { foods });
                });
        },
        addNewFood(req, res) {
            let title = req.body.title;
            let details = req.body.details;
            let calories = req.body.calories;
            let proteins = req.body.proteins;
            let carbs = req.body.carbs;
            let fats = req.body.fats;
            let category = req.body.category;
            let foods;

            return data.getAllFoods()
                .then((resultFoods) => {
                    foods = resultFoods;
                    return data.addNewFood(title, details, calories, proteins, carbs, fats, category);
                })
                .then(() => {
                    logger.log("info", `Admin user - ${req.user.username}, invoked addNewDiet with result`, {
                        meta: {
                            title, details,
                            calories, proteins, carbs, fats, category
                        }
                    });

                    res.render(ADMIN_PANEL_VIEW, { foods });
                });
        }
    };
};