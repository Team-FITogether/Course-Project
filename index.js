"use strict";

const express = require("express");
const config = require("./server/configurations");
const userValidator = require("./server/utils/user-validator");
const app = express();
app.locals.moment = require("moment");
const http = require("http").Server(app);
const io = require("socket.io")(http);

require("./server/configurations/database")(config);
require("./server/configurations/express")(app, config);
require("./server/configurations/passport")();

const passport = require("passport");
const encryption = require("./server/utils/encryption");
const data = require("./server/data")();
const controllers = require("./server/controllers")({ app, config, userValidator, passport, encryption, data });

require("./server/routers")({ app, config, userValidator, controllers });
require("./server/configurations/socket-io")(io);

http.listen(config.port);
console.log(`Server listens on ${config.port}`);