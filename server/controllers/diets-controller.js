"use strict";

const Diet = require("./../models/diet.js");

function getAllDiets(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    Diet
        .find()
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

    Diet.find({ title })
        .then((diet) => {
            res.render("food/single-diet", {
                title: diet[0].title,
                body: diet[0].body,
                imgSrc: diet[0].imgSrc,
                comments: diet[0].comments,
                user
            });
        });

}

module.exports = { getAllDiets, getSingleDiet };