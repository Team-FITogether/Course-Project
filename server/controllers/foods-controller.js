"use strict";

const Food = require("./../models/food.js");
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
    let title = req.query.title;
    let viewBag = viewBagUtil.getViewBag(req);

    Food.find({ title })
        .then((food) => {
            res.render("food/single-food", {
                title: food[0].title,
                body: food[0].body,
                comments: food[0].comments,
                viewBag
            });
        });
}

module.exports = {
    getAllFoods,
    getSingleFood,
};
