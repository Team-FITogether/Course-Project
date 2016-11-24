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
    data.getSingleDiet(title)
        .then((diet) => { 
            let dietComments = diet
                .comments
                .map(c => {
                    return {
                        content: c.content,
                        postDate: c.postDate.toString().substring(0, 25),
                        author: c.author
                    };
                });

            res.render("food/single-diet", {
                id: diet._id,
                title: diet.title,
                body: diet.body,
                imgSrc: diet.imgSrc,
                comments: dietComments,
                user
            });
        });

}

function addComment(req, res) {
    let body = req.body;
    let comment = {
        content: body.content,
        author: req.user.username,
        postDate: Date.now()
    };

    data.getDietById(body.entityId)
        .then(diet => {
            diet.comments.push(comment);
            diet.save();
            res.redirect("back");
        })
        .catch(err => res.status(500).send(err));
}


module.exports = {
    getAllDiets,
    getSingleDiet,
    addComment
};
