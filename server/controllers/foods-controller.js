"use strict";

const Food = require("./../models/food.js");
const FoodDetails = require("./../models/food-details.js");

const data = require("./../data")({ Food, FoodDetails });

function getAllFoods(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    data.getAllFoods()
        .then(foods => {
            res.render("food/all-foods", { foods, user });
        });
}

function getSingleFood(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    let title = req.query.title;
    let details = req.query.details;

    data.getSingleFood(title, details)
        .then((food) => {
            res.render("food/single-food", {
                user,
                food
            });
        });
}

function getFoodByCategory(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    let categoryTitle = req.query.title;

    data.getFoodByCategory(categoryTitle)
        .then((foods) => {
            console.log(foods);
            res.render("food/single-food-category", {
                user,
                foods
            });
        });
}

module.exports = {
    getAllFoods,
    getSingleFood,
    getFoodByCategory
};
