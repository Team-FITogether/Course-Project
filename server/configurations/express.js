"use strict";

const express = require("express");
const path = require("path");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");

module.exports = (app, config) => {
    app.set("view engine", "pug");
    app.set("views", path.join(config.rootPath, "server/views/"));
    app.use(express.static(path.join(config.rootPath, "public")));

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(expressSession({
        secret: "noissessserpxe",
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
};