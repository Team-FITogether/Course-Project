"use strict";

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

module.exports = config => {
    mongoose.connect(config.db.remote);
    require("../models/user").addAdminUser();
};