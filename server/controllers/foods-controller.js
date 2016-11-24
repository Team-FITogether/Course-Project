"use strict";

const Food = require("./../models/food.js");
const FoodDetails = require("./../models/food-details.js");

function getAllFoods(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    Food
        .find()
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
    
    FoodDetails
        .find({ "category": title })
        .then((foods) => {


            res.render("food/single-food", {
                user,
                foods
            });
        });
}

module.exports = {
    getAllFoods,
    getSingleFood
};
