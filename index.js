"use strict";

const express = require("express");
const config = require("./server/configurations");
const userValidator = require("./server/utils/user-validator");
const app = express();

require("./server/configurations/database")(config);
require("./server/configurations/express")(app, config);
require("./server/configurations/passport")();
require("./server/routers")(app, config, userValidator);

app.listen(config.port);
console.log(`Server listens on ${config.port}`);