"use strict";

const express = require("express");
const path = require("path");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const chatInvitationSse = require("../utils/chat-invitation-sse");

module.exports = ({config, data}) => {
    let app = express();

    app.locals.moment = require("moment");
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
    require("./passport")({ app, data });
    app.use(chatInvitationSse);

    return app;
};