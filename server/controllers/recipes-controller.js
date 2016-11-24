"use strict";

const Recipe = require("./../models/recipe.js");

const data = require("./../data")({ Recipe })

function sortRecipes(recipes) {
    return recipes.sort((a, b) => {
        let firstTitle = a.title.toUpperCase();
        let secondTitle = b.title.toUpperCase();
        return firstTitle < secondTitle ? -1 : firstTitle > secondTitle ? 1 : 0;
    });
}

function getAllRecipes(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    data.getAllRecipes()
        .then(recipes => {
            sortRecipes(recipes);
            res.render("food/all-recipes", { user, recipes });
        });
}

function getSingleRecipe(req, res) {
    let title = req.query.title;

    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }
    data.getSingleRecipe(title)
        .then((recipe) => {
            res.render("food/single-recipe", {
                id: recipe[0]._id,
                title: recipe[0].title,
                body: recipe[0].body,
                imgSrc: recipe[0].imgSrc,
                comments: recipe[0].comments,
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

    data.getRecipeById(body.entityId)
        .then(recipe => {
            recipe.comments.push(comment);
            recipe.save();
            res.redirect("back");
        })
        .catch(err => res.status(500).send(err));
}

module.exports = {
    getAllRecipes,
    getSingleRecipe,
    addComment
};
