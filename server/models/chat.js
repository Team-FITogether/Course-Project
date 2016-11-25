const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const chatSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    messages: [{
        content: String,
        author: String,
        avatarSrc: String
    }]
});

chatSchema.plugin(findOrCreate);
const Chat = mongoose.model("chat", chatSchema);

module.exports = Chat;