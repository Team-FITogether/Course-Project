"use strict";

module.exports = (userValidator, common) => {
    return {
        loadHomePage(req, res) {
            common.setIsAdminUser(req, userValidator);

            let model = { content: "Some content" };
            res.render("home/home", { user: req.user, model });
        }
    };
};