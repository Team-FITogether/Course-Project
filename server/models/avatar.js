const mongoose = require("mongoose");

const avatarSchema = mongoose.Schema({
    content: Buffer,
    mimetype: String,
    name: String
});

module.exports = avatarSchema;