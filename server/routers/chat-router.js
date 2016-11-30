"use strict";

// const controllers = require("../controllers");

module.exports = ({ app, controllers }) => {
    const chatController = controllers.chat;

    app.get("/stream", chatController.stream);
    app.get("/chat/invitation", chatController.handleInvitation);
    app.get("/chat-room/:id", chatController.loadChatRoom);
};