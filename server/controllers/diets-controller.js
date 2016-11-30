"use strict";

const data = require("./../data/diets-data");

const ADMIN = "admin";

function setIsAdminUser(req, userValidator) {
    if (req.user) {
        req.user.isAdmin = userValidator.isInRole(req.user, ADMIN);
    }
}

function getDietComments(diet) {
    let dietComments = diet
        .comments
        .map(c => {
            return {
                content: c.content,
                postDate: c.postDate.toString().substring(0, 25),
                author: c.author
            };
        });

    return dietComments;
}

function renderDiet(diet, dietComments, req, res) {
    res.render("food/single-diet", {
        id: diet._id,
        title: diet.title,
        body: diet.body,
        imgSrc: diet.imgSrc,
        comments: dietComments,
        user: req.user
    });
}

module.exports = userValidator => {
    return {
        getAllDiets(req, res) {
            setIsAdminUser(req, userValidator);
            data.getAllDiets().then(diets => res.render("food/all-diets", { user: req.user, diets }));
        },
        getSingleDiet(req, res) {
            setIsAdminUser(req, userValidator);
            let title = req.query.title;
            data.getSingleDiet(title)
                .then((diet) => {
                    let dietComments = getDietComments();
                    renderDiet(diet, dietComments, req, res);
                });
        },
        addComment(req, res) {
            let comment = {
                content: req.body.content,
                author: req.user.username,
                postDate: Date.now()
            };

            data.getDietById(req.body.entityId)
                .then(diet => {
                    diet.comments.push(comment);
                    diet.save();
                    res.redirect("back");
                })
                .catch(err => res.status(500).send(err));
        }
    };
};
