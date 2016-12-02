"use strict";

const passport = require("passport");

const data = require("./server/data")();
const config = require("./server/configurations");
const userValidator = require("./server/utils/user-validator");
const app = require("./server/configurations/express")({ config, data });
const http = require("http").Server(app);
const io = require("socket.io")(http);

const encryption = require("./server/utils/encryption");
const controllers = require("./server/controllers")({ app, config, userValidator, passport, encryption, data });
require("./server/configurations/database")(config);
require("./server/configurations/passport")({ app, data });
require("./server/routers")({ app, config, userValidator, controllers });
require("./server/configurations/socket-io")(io);

http.listen(config.port);
console.log(`Server listens on ${config.port}`);
module.exports = app;