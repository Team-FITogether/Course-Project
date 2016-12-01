"use strict";

const HOME_VIEW = "home/home";

module.exports = function({ userValidator, common }) {
    return {
        loadHomePage(req, res) {
            common.setIsAdminUser(req, userValidator);

            let model = { content: "Some content" };
            res.render(HOME_VIEW, { user: req.user, model });
        }
    };
};
