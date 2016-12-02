"use strict";

const fs = require("fs");
const path = require("path");
const common = require("../utils/common");

module.exports = ({ app, config, userValidator, controllers }) => {
    const routersFolderPath = path.join(config.rootPath, "server/routers");
    const routersFileNames = fs.readdirSync(routersFolderPath);


    routersFileNames.filter(file => file.includes("-router"))
        .forEach(file => require(`${__dirname}/${file}`)({ app, userValidator, common, controllers }));

    app.all("*", (req, res) => {
        res.status(404);
        res.render("error-pages/404-not-found");
        res.end();
    });
};