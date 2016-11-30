"use strict";

function loadHomePage(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    let model = {
        content: "Some content"
    };
    res.render("home/home", { user, model });
}

module.exports = { loadHomePage };