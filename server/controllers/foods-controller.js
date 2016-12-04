"use strict";

const ALL_FOODS_VIEW = "food/all-foods";
const SINGLE_FOOD_VIEW = "food/single-food";
const EDIT_FOOD_VIEW = "food/edit-foods";
const SINGLE_FOOD_CATEGORY_VIEW = "food/single-food-category";
const PAGES_NOT_FOUND_VIEW = "error-pages/404-not-found";
const ADMIN_ROLE = "admin";

function loadAllFoods(user, req, res, page, pageSize, userValidator, common, data) {
    common.setIsAdminUser(req, userValidator);
    return data.getAllFoods(page, pageSize)
        .then(result => {
            let foods = result[0];
            let count = result[1];
            let pages = count / pageSize;

            if (page > pages) {
                res.render(PAGES_NOT_FOUND_VIEW);
                return res.status(404);
            }

            return res.render(ALL_FOODS_VIEW, { user, foods, page, pages });
        });
}

module.exports = ({ userValidator, common, data }) => {
    return {
        loadEditFoodPage(req, res) {
            common.setIsAdminUser(req, userValidator);
            let foodId = req.body.id;
            return data.getFoodById(foodId)
                .then(food => res.render(EDIT_FOOD_VIEW, { user: req.user, food }));
        },
        getAllFoods(req, res) {
            let user = req.user;
            let page = Number(req.query.page || 1);
            let pageSize = 10;

            return loadAllFoods(user, req, res, page, pageSize, userValidator, common, data);
        },
        getSingleFood(req, res) {
            common.setIsAdminUser(req, userValidator);
            let title = req.query.title;
            let details = req.query.details;

            return data.getSingleFood(title, details)
                .then((food) => res.render(SINGLE_FOOD_VIEW, { user: req.user, food }));
        },
        getFoodByCategory(req, res) {
            common.setIsAdminUser(req, userValidator);
            let categoryTitle = req.query.title;

            return data.getFoodByCategory(categoryTitle)
                .then((foods) => res.render(SINGLE_FOOD_CATEGORY_VIEW, { user: req.user, foods }));
        },
        createFood(req, res) {
            let foodTitle = req.body.foodTitle;

            return data.addNewFoodCategory(foodTitle)
                .then(() => res.redirect(`/foods/single-food-category?title=${foodTitle}`))
                .catch(console.log);
        },
        saveEditedFood(req, res) {
            let foodId = req.body.foodId;
            let foodTitle = req.body.foodTitle;

            let update = { title: foodTitle };
            let options = { new: true };

            return data.updateFood(foodId, update, options)
                .then(() => res.redirect("/"))
                .catch(console.log);
        },
        deleteFood(req, res) {
            let foodId = req.body.foodId;
            let update = { deletedOn: Date.now() };
            let options = { new: true };

            return data.updateFood(foodId, update, options)
                .then(() => res.redirect("back"))
                .catch(console.log);
        },
        restoreFood(req, res) {
            let foodId = req.body.foodId;
            let update = { deletedOn: null };
            let options = { new: true };

            return data.updateFood(foodId, update, options)
                .then(() => res.redirect("back"))
                .catch((err) => console.log(err));
        }
    };
};
