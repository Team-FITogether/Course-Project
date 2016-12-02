"use strict";

const ALL_FOODS_VIEW = "food/all-foods";
const SINGLE_FOOD_VIEW = "food/single-food";
const SINGLE_FOOD_CATEGORY_VIEW = "food/single-food-category";
const PAGES_NOT_FOUND_VIEW = "error-pages/404-not-found";

function loadAllFoods(req, res, page, pageSize, data) {
    return data.getAllFoods(page, pageSize)
        .then(result => {
            let foods = result[0];
            let count = result[1];
            let pages = count / pageSize;

            if (page > pages) {
                res.render(PAGES_NOT_FOUND_VIEW);
                return res.status(404);
            }

            return res.render(ALL_FOODS_VIEW, { foods, page, pages });
        });
}

module.exports = ({ userValidator, common, data }) => {
    return {
        getAllFoods(req, res) {
            let page = Number(req.query.page || 1);
            let pageSize = 10;

            return loadAllFoods(req, res, page, pageSize, data);
        },
        getSingleFood(req, res) {
            common.setIsAdminUser(req, userValidator);
            let title = req.query.title;
            let details = req.query.details;

            return data.getSingleFood(title, details)
                .then((food) => res.render(SINGLE_FOOD_VIEW, { 
                    user: req.user, 
                    food 
                }));
        },
        getFoodByCategory(req, res) {
            common.setIsAdminUser(req, userValidator);
            let categoryTitle = req.query.title;

            return data.getFoodByCategory(categoryTitle)
                .then((foods) => res.render(SINGLE_FOOD_CATEGORY_VIEW, { user: req.user, foods }));
        }
    };
};
