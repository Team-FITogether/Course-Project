"use strict";

const controllers = require("../controllers");

module.exports = app => {
    app.get("/stream", controllers.chat.stream);
    app.get("/chat/invitation", controllers.chat.handleInvitation);
    app.get("/chat-room/:id", controllers.chat.loadChatRoom);
};