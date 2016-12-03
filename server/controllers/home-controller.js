"use strict";

const HOME_VIEW = "home/home";

module.exports = function ({ userValidator, common, data }) {
    return {
        loadHomePage(req, res) {
            common.setIsAdminUser(req, userValidator);
            return data.getTopLikedArticles()
                .then(articles => {
                    res.render(HOME_VIEW, { user: req.user, articles });
                });
        }
    };
};