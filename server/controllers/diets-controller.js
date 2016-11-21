"use strict";

const Diet = require("./../models/diet.js");
const viewBagUtil = require("./../utils/view-bag");

function getAllDiets(req, res) {
    let viewBag = viewBagUtil.getViewBag(req);

    Diet
        .find()
        .then(diets => {
            res.render("food/all-diets", { diets, viewBag });
        });
}

function getSingleDiet(req, res) {
    let title = req.query.title;
    let viewBag = viewBagUtil.getViewBag(req);

    Diet.find({ title })
        .then((diet) => {
            res.render("food/single-diet", {
                title: diet[0].title,
                body: diet[0].body,
                imgSrc: diet[0].imgSrc,
                comments: diet[0].comments,
                viewBag
            });
        });

}

module.exports = { getAllDiets, getSingleDiet };