"use strict";

const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const validationConstants = require("../utils/validation-constants");

const chatSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    messages: [{
        content: String,
        author: { type: String, minlength: validationConstants.MIN_LENGTH, maxlength: validationConstants.MAX_USER_NAME_LENGTH },
        avatarSrc: { type: String, minlength: validationConstants.MIN_LENGTH, maxlength: validationConstants.MAX_IMG_SRC_LENGTH }
    }]
});

chatSchema.plugin(findOrCreate);
const Chat = mongoose.model("chat", chatSchema);
module.exports = Chat;