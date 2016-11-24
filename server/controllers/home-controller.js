"use strict";

const pug = require("pug");
const config = require("../configurations");
const path = require("path");
const viewBagUtil = require("./../utils/view-bag");

function loadHomePage(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    let model = {
        content: "Some content"
    }
    let pathToReadFrom = path.join(config.rootPath, "server/views/home/home.pug");
    let compiledFile = pug.compileFile(pathToReadFrom);
    let viewBag = viewBagUtil.getViewBag(req);
    viewBag.isOnHomePage = true;
    let html = compiledFile({ viewBag, model });
    res.render("home/home", { user, model });
}

module.exports = { loadHomePage };