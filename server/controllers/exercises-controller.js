"use strict";

// const data = require("./../data/exercises-data");

function getExerciseComments(explanation) {
    let excersiseComments = explanation
        .comments
        .map(c => {
            return {
                content: c.content,
                postDate: c.postDate.toString().substring(0, 25),
                author: c.author
            };
        });

    return excersiseComments;
}

function renderExerciseExplanation(explanation, excersiseComments, req, res) {
    res.render("exercises/exercise-explanation", {
        title: explanation.title,
        content: explanation.content,
        category: explanation.category,
        author: explanation.author,
        comments: excersiseComments,
        id: explanation._id,
        user: req.user
    });
}

module.exports = ({ userValidator, common, data }) => {
    return {
        getAllExercisesByCategory(req, res) {
            common.setIsAdminUser(req, userValidator);
            let category = req.query.category;

            data.getAllExercisesByCategory(category)
                .then(exercises => {
                    res.render("exercises/exercise-by-category", { user: req.user, exercises });
                });
        },
        getSingleExercise(req, res) {
            let title = req.query.title;
            common.setIsAdminUser(req, userValidator);

            data.getSingleExercise(title)
                .then((explanation) => {
                    let excersiseComments = getExerciseComments(explanation);
                    renderExerciseExplanation(explanation, excersiseComments, req, res);
                });
        },
        addComment(req, res) {
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
        },
        getAllCategoriesOfExercise(req, res) {
            common.setIsAdminUser(req, userValidator);
            data.getAllCategories()
                .then(exercises => {
                    res.render("exercises/all-exercises", { user: req.user, exercises });
                });
        }
    };
};