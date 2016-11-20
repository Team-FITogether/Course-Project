"use strict";

const pug = require("pug");
const config = require("../configurations");
const path = require("path");
const userValidator = require("../utils/user-validator");

function loadHomePage(req, res) {
    let pathToReadFrom = path.join(config.rootPath, "server/views/home/home.pug");
    let username = req.user ? req.user.username : "";
    let isLoggedIn = !!req.user;
    let isAdmin = !req.user ? false : userValidator.isInRole(req.user, "admin");
    let compiledFile = pug.compileFile(pathToReadFrom);
    let userId = !req.user ? null : req.user.id;
    let html = compiledFile({ isAdmin, isLoggedIn, username, userId });

    res.send(html);
}

module.exports = { loadHomePage };