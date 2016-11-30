/* globals module require __dirname */
"use strict";

const path = require("path");
const fs = require("fs");

module.exports = () => {
    let data = {};

    fs.readdirSync(__dirname)
        .filter(file => file.includes("-data"))
        .forEach(file => {
            let dataModule = require(path.join(__dirname, file));

            Object
                .keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        });
    return data;
};