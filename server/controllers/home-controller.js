"use strict";

const pug = require("pug");
const config = require("../configurations");
const path = require("path");
const viewBagUtil = require("./../utils/view-bag");

function loadHomePage(req, res) {
    let pathToReadFrom = path.join(config.rootPath, "server/views/home/home.pug");
    let compiledFile = pug.compileFile(pathToReadFrom);
    let viewBag = viewBagUtil.getViewBag(req);
    viewBag.isOnHomePage = true;
    let html = compiledFile({ viewBag });
    res.send(html);
}

module.exports = { loadHomePage };