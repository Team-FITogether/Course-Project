/* globals module require __dirname */
"use strict";

const path = require("path");
const fs = require("fs");
const common = require("../utils/common");

module.exports = ({ app, config, userValidator, passport, encryption, data }) => {
    let controllers = {};
    fs.readdirSync(__dirname)
        .filter(file => file.includes("-controller"))
        .forEach(file => {
            let controllerModule = require(path.join(__dirname, file))({ app, config, userValidator, passport, encryption, data, common });

            let moduleName = file.substring(0, file.indexOf("-controller"));
            controllers[moduleName] = controllerModule;
        });

    return controllers;
};