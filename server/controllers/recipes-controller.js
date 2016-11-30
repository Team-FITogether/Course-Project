"use strict";

const data = require("./../data/recipes-data");

function sortRecipes(recipes) {
    return recipes.sort((a, b) => {
        let firstTitle = a.title.toUpperCase();
        let secondTitle = b.title.toUpperCase();
        return firstTitle < secondTitle ? -1 : firstTitle > secondTitle ? 1 : 0;
    });
}

module.exports = (userValidator, common) => {
    return {
        getAllRecipes(req, res) {
            common.setIsAdminUser(req, userValidator);
            data.getAllRecipes()
                .then(recipes => {
                    sortRecipes(recipes);
                    res.render("food/all-recipes", { user: req.user, recipes });
                });
        },
        getSingleRecipe(req, res) {
            let title = req.query.title;

            common.setIsAdminUser(req, userValidator);
            data.getSingleRecipe(title)
                .then(recipe => {
                    res.render("food/single-recipe", {
                        id: recipe[0]._id,
                        title: recipe[0].title,
                        body: recipe[0].body,
                        imgSrc: recipe[0].imgSrc,
                        comments: recipe[0].comments,
                        user: req.user
                    });
                });
        },
        addComment(req, res) {
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
    };
};
