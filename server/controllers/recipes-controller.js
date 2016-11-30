"use strict";

const data = require("./../data/recipes-data");

const ALL_RECIPES_VIEW = "food/all-recipes";
const SINGLE_RECIPE_VIEW = "food/single-recipe";

function loadAllRecipes(user, req, res, page, pageSize) {
    data.getAllRecipes(page, pageSize)
        .then(result => {
            let recipes = result[0];
            let count = result[1];
            let pages = count / pageSize;

            if (page > pages) {
                res.render("error-pages/404-not-found");
                return res.status(404);
            }

            // Check if current user has liked the article, if true - set bool
            // so view can render an unlike button
            if (user) {
                for (let i = 0; i < recipes.length; i += 1) {
                    for (let j = 0; j < recipes[i].usersLiked.length; j += 1) {
                        if (recipes[i].usersLiked[j].user === user.username) {
                            recipes[i].currentUserHasLiked = true;
                        } else {
                            recipes[i].currentUserHasLiked = false;
                        }
                    }
                }
            }

            res.render(ALL_RECIPES_VIEW, { user, recipes, page, pages });
        });
}

function likeRecipe(recipeId, req, res) {
    let update = { $inc: { likes: 1 } };
    data.updateRecipe(recipeId, update, null)
        .then((recipe) => {
            let user = { user: req.user.username };
            recipe.usersLiked.push(user);
            recipe.save();
            return recipe;
        })
        .then((recipe) => {
            res.json(JSON.stringify(recipe.likes + 1));
        });
}

function dislikeRecipe(recipeId, index, res) {
    let update = { $inc: { likes: -1 } };
    data.updateRecipe(recipeId, update, null)
        .then((recipe) => {
            recipe.usersLiked.splice(index, 1);
            recipe.save();
            return recipe;
        })
        .then(recipe => res.json(JSON.stringify(recipe.likes - 1)));
}

module.exports = (userValidator, common) => {
    return {
        getAllRecipes(req, res) {
            let user = req.user;
            let page = Number(req.query.page || 1);
            let pageSize = 10;

            return loadAllRecipes(user, req, res, page, pageSize);
        },
        getSingleRecipe(req, res) {
            let title = req.query.title;
            data.getSingleRecipe(title)
                .then(recipe => {
                    res.render(SINGLE_RECIPE_VIEW, {
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
        },
        toggleLikeOnRecipe(req, res) {
            let recipeId = req.body.targetId;
            data.getRecipeById(recipeId)
                .then(recipe => {
                    for (let i = 0; i < recipe.usersLiked.length; i += 1) {
                        if (recipe.usersLiked[i].user === req.user.username) {
                            return i;
                        }
                    }
                    return -1;
                })
                .then(index => {
                    if (index !== -1) {
                        dislikeRecipe(recipeId, index, res);
                    } else {
                        likeRecipe(recipeId, req, res);
                    }
                });
        }
    };
};
