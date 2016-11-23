"use strict";

const express = require("express");
const config = require("./server/configurations");
const userValidator = require("./server/utils/user-validator");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

require("./server/configurations/database")(config);
require("./server/configurations/express")(app, config);
require("./server/configurations/passport")();
require("./server/routers")(app, config, userValidator);
require("./server/configurations/socket-io")(io);

http.listen(config.port);
console.log(`Server listens on ${config.port}`);