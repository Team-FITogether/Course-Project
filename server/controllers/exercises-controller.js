"use strict";

const Exercise = require("./../models/exercise.js");
const ExerciseExplanation = require("./../models/exercise-explanation");
const ExerciseCategory = require("./../models/exercise-category");
const viewBagUtil = require("./../utils/view-bag");

const data = require("./../data")({ ExerciseCategory, ExerciseExplanation, Exercise });

function getAllExercisesByCategory(req, res) {
    let viewBag = viewBagUtil.getViewBag(req);
    let category = req.query.category;

    data.getAllExercisesByCategory(category)
        .then(exercises => {
            res.render("exercises/exercise-by-category", { exercises, viewBag });
        });
}

function getAllCategoriesOfExercise(req, res) {
    let viewBag = viewBagUtil.getViewBag(req);

    data.getAllCategories()
        .then(exercises => {
            res.render("exercises/all-exercises", { exercises, viewBag });
        });
}

function getSingleExercise(req, res) {
    let title = req.query.title;
    let viewBag = viewBagUtil.getViewBag(req);

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
                viewBag
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