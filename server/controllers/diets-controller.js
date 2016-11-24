"use strict";

const Diet = require("./../models/diet.js");

const data = require("./../data")({ Diet });

function getAllDiets(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    data.getAllDiets()
        .then(diets => {
            res.render("food/all-diets", { user, diets });
        });
}

function getSingleDiet(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

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
