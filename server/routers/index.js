"use strict";

const fs = require("fs");
const path = require("path");
const controllers = require("../controllers");

module.exports = (app, config, userValidator) => {
    app.get("/", controllers.home.loadHomePage);

    const routersFolderPath = path.join(config.rootPath, "server/routers");
    const routersFileNames = fs.readdirSync(routersFolderPath);

    routersFileNames
        .filter(file => file.indexOf("-router") >= 0)
        .forEach(file => require(`${__dirname}/${file}`)(app, userValidator));

    app.all("*", (req, res) => {
        res.status(404);
        res.render("error-pages/404-not-found");
        res.end();
    });
};