"use strict";

const Exercise = require("./../models/exercise.js");
const ExerciseExplanation = require("./../models/exercise-explanation");
const viewBagUtil = require("./../utils/view-bag");

function getAllExercises(req, res) {
    let viewBag = viewBagUtil.getViewBag(req);
    Exercise
        .find()
        .then(exercises => {
            res.render("exercises/all-exercises", { exercises, viewBag });
        });
}

function getSingleExercise(req, res) {
    let title = req.query.title;
    let viewBag = viewBagUtil.getViewBag(req);

    ExerciseExplanation
        .findOne({ title })
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

    console.log(comment);
    console.log(body.entityId);

    ExerciseExplanation
        .findById(body.entityId)
        .then(ex => {
            ex.comments.push(comment);
            ex.save();
            res.redirect("back");
        })
        .catch(err => res.status(500).send(err));
}

module.exports = { getAllExercises, getSingleExercise, addComment };