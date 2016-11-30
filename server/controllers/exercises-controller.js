"use strict";

const data = require("./../data/exercises-data");

function getAllExercisesByCategory(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    let category = req.query.category;

    data.getAllExercisesByCategory(category)
        .then(exercises => {
            res.render("exercises/exercise-by-category", { user, exercises });
        });
}

function getAllCategoriesOfExercise(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    data.getAllCategories()
        .then(exercises => {
            res.render("exercises/all-exercises", { user, exercises });
        });
}

function getSingleExercise(req, res) {
    let title = req.query.title;

    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    data.getSingleExercise(title)
        .then((explanation) => {
            let excersiseComments = explanation
                .comments
                .map(c => {
                    return {
                        content: c.content,
                        postDate: c.postDate.toString().substring(0, 25),
                        author: c.author
                    };
                });

            res.render("exercises/exercise-explanation", {
                title: explanation.title,
                content: explanation.content,
                category: explanation.category,
                author: explanation.author,
                comments: excersiseComments,
                id: explanation._id,
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

    data.getExerciseExplanationById(body.entityId)
        .then(ex => {
            ex.comments.push(comment);
            ex.save();
            res.redirect("back");
        })
        .catch(err => res.status(500).send(err));
}

module.exports = { getAllExercisesByCategory, getSingleExercise, addComment, getAllCategoriesOfExercise };