"use strict";

const controllers = require("../controllers");

module.exports = (app, userValidator) => {
    const chatController = controllers.chat(userValidator);

    app.get("/stream", chatController.stream);
    app.get("/chat/invitation", chatController.handleInvitation);
    app.get("/chat-room/:id", chatController.loadChatRoom);
};