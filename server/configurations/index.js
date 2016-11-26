"use strict";

const remoteDbUsername = "fitogetheruser";
const remoteDbPassword = "telerikacademy";

const path = require("path");

const rootPath = path.join(__dirname, "/../../");

module.exports = {
    db: {
        local: "mongodb://localhost:27017/FiTogether",
        remote: `mongodb://${remoteDbUsername}:${remoteDbPassword}@ds050539.mlab.com:50539/fitogether`},
    port: 8080,
    rootPath
};