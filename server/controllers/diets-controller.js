"use strict";

const Diet = require("./../models/diet.js");
const viewBagUtil = require("./../utils/view-bag");

const data = require("./../data")({ Diet });

function getAllDiets(req, res) {
    let viewBag = viewBagUtil.getViewBag(req);

    data.getAllDiets()
        .then(diets => {
            res.render("food/all-diets", { diets, viewBag });
        });
}

function getSingleDiet(req, res) {
    let title = req.query.title;
    let viewBag = viewBagUtil.getViewBag(req);
    data.getSingleDiet(title)
        .then((diet) => { 
            res.render("food/single-diet", {
                title: diet.title,
                body: diet.body,
                imgSrc: diet.imgSrc,
                comments: diet.comments,
                viewBag
            });
        });

}

module.exports = { getAllDiets, getSingleDiet };
