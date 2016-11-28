"use strict";

const remoteDbUsername = "fitogetheruser";
const remoteDbPassword = "telerikacademy";

const path = require("path");

const rootPath = path.join(__dirname, "/../../");

module.exports = {
    connectionString: {
        dev: "mongodb://localhost:27017/FiTogether",
        prod: `mongodb://${remoteDbUsername}:${remoteDbPassword}@ds050539.mlab.com:50539/fitogether`
    },
    port: process.env.PORT || 8080,
    rootPath
};