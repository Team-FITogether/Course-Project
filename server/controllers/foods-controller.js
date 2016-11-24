"use strict";

const Food = require("./../models/food.js");
const FoodDetails = require("./../models/food-details.js");
const viewBagUtil = require("./../utils/view-bag");

const data = require("./../data")({ Food, FoodDetails });

function getAllFoods(req, res) {
    let viewBag = viewBagUtil.getViewBag(req);

    data.getAllFoods()
        .then(foods => {
            res.render("food/all-foods", { foods, viewBag });
        });
}

function getSingleFood(req, res) {
    let viewBag = viewBagUtil.getViewBag(req);
    let title = req.query.title;

    data.getSingleFood(title)
        .then((foods) => {
            res.render("food/single-food", {
                foods,
                viewBag
            });
        });
}

module.exports = {
    getAllFoods,
    getSingleFood
};
