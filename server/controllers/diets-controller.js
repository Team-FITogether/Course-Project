"use strict";

const ALL_DIETS_VIEW = "food/all-diets";
const SINGLE_DIET_VIEW = "food/single-diet";
const PAGES_NOT_FOUND_VIEW = "error-pages/404-not-found";

function loadAllDiets(req, res, page, pageSize, data) {
    return data.getAllDiets(page, pageSize)
        .then(result => {
            let diets = result[0];
            let count = result[1];
            let pages = count / pageSize;

            if (page > pages) {
                res.render(PAGES_NOT_FOUND_VIEW);
                return res.status(404);
            }

            res.render(ALL_DIETS_VIEW, { diets, page, pages });
        });
}

module.exports = ({ data }) => {
    return {
        getAllDiets(req, res) {
            let page = Number(req.query.page || 1);
            let pageSize = 10;

            return loadAllDiets(req, res, page, pageSize, data);
        },
        getSingleDiet(req, res) {
            let title = req.query.title;
            return data.getSingleDiet(title)
                .then((diet) => {
                    res.render(SINGLE_DIET_VIEW, {
                        id: diet._id,
                        title: diet.title,
                        body: diet.body,
                        imgSrc: diet.imgSrc,
                        comments: diet.comments,
                        user: req.user
                    });
                });
        },
        addComment(req, res) {
            let body = req.body;
            let comment = {
                content: req.body.content,
                author: req.user.username,
                postDate: Date.now()
            };

            return data.getDietById(body.entityId)
                .then(diet => {
                    diet.comments.push(comment);
                    diet.save();
                    res.redirect("back");
                })
                .catch(err => {
                    res.status(500);
                    res.send(err)
                });
        }
    };
};
