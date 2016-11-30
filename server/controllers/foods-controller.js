"use strict";

const data = require("./../data/foods-data");

module.exports = (userValidator, common) => {
    return {
        getAllFoods(req, res) {
            common.setIsAdminUser(req, userValidator);
            data.getAllFoods().then(foods => res.render("food/all-foods", { foods, user: req.user }));
        },
        getSingleFood(req, res) {
            common.setIsAdminUser(req, userValidator);
            let title = req.query.title;
            let details = req.query.details;

            data.getSingleFood(title, details)
                .then((food) => res.render("food/single-food", { user: req.user, food }));
        },
        getFoodByCategory(req, res) {
            common.setIsAdminUser(req, userValidator);
            let categoryTitle = req.query.title;

            data.getFoodByCategory(categoryTitle)
                .then((foods) => res.render("food/single-food-category", { user: req.user, foods }));
        }
    };
};