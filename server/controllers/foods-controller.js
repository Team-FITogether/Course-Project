"use strict";

const Food = require("./../models/food.js");
const FoodDetails = require("./../models/food-details.js");
const viewBagUtil = require("./../utils/view-bag");

function getAllFoods(req, res) {
    let viewBag = viewBagUtil.getViewBag(req);

    Food
        .find()
        .then(foods => {
            res.render("food/all-foods", { foods, viewBag });
        });
}

function getSingleFood(req, res) {
    let viewBag = viewBagUtil.getViewBag(req);
    let title = req.query.title;
    
    FoodDetails
        .find({ "category": title })
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
