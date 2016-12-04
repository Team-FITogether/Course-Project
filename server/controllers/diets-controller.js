"use strict";

const ALL_DIETS_VIEW = "food/all-diets";
const SINGLE_DIET_VIEW = "food/single-diet";
const EDIT_DIET_VIEW = "food/edit-diet";
const PAGES_NOT_FOUND_VIEW = "error-pages/404-not-found";
const ADMIN_ROLE = "admin";

function loadAllDiets(user, req, res, page, pageSize, userValidator, common, data) {
    common.setIsAdminUser(req, userValidator);
    return data.getAllDiets(page, pageSize)
        .then(result => {
            let diets = result[0];
            let count = result[1];
            let pages = count / pageSize;

            if (page > pages) {
                res.render(PAGES_NOT_FOUND_VIEW);
                return res.status(404);
            }

            res.render(ALL_DIETS_VIEW, { user, diets, page, pages });
        });
}

module.exports = ({ userValidator, common, data }) => {
    return {
        loadEditDietPage(req, res) {
            common.setIsAdminUser(req, userValidator);
            let dietId = req.body.id;
            return data.getDietById(dietId)
                .then(diet => res.render(EDIT_DIET_VIEW, { user: req.user, diet }));
        },
        getAllDiets(req, res) {
            let user = req.user;
            let page = Number(req.query.page || 1);
            let pageSize = 10;

            return loadAllDiets(user, req, res, page, pageSize, userValidator, common, data);
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
                    res.send(err);
                });
        },
        getAllDietsRest(req, res) {
            return data.getAllDietsRest()
                .then(diets => res.json(diets))
                .catch(console.log);
        },
        createDiet(req, res) {
            let dietTitle = req.body.dietTitle;
            let dietBody = req.body.dietBody;

            return data.addNewDiet(dietTitle, dietBody)
                .then(() => res.redirect(`/diets/single-diet?title=${dietTitle}`))
                .catch(console.log);
        },
        saveEditedDiet(req, res) {
            let dietId = req.body.dietId;
            let dietTitle = req.body.dietTitle;
            let dietBody = req.body.dietBody;

            let update = { title: dietTitle, body: dietBody };
            let options = { new: true };

            return data.updateDiet(dietId, update, options)
                .then(() => res.redirect("/"))
                .catch(console.log);
        },
        deleteDiet(req, res) {
            let dietId = req.body.dietId;
            let update = { deletedOn: Date.now() };
            let options = { new: true };

            return data.updateDiet(dietId, update, options)
                .then(() => res.redirect("back"))
                .catch(console.log);
        },
        restoreDiet(req, res) {
            let dietId = req.body.dietId;
            let update = { deletedOn: null };
            let options = { new: true };

            return data.updateDiet(dietId, update, options)
                .then(() => res.redirect("back"))
                .catch((err) => console.log(err));
        }
    };
};
