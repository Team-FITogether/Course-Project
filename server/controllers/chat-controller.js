"use strict";

const encryption = require("../utils/encryption");

let connections = new Map();
let rooms = new Set();

function getRandomRoomName() {
    let isValidRoom = false;
    let roomName;

    while (!isValidRoom) {
        let randomNumber = Math.random() * 1000000;
        let salt = encryption.getSalt();
        roomName = encryption.getPassHash(salt, randomNumber.toString());

        if (!rooms.has(roomName)) {
            rooms.add(roomName);
            isValidRoom = true;
            break;
        }
    }

    return roomName;
}

function stream(req, res) {
    res.sseSetup();
    if (req.user) {
        connections.set(req.user.username, req.res);
    }
}

function handleInvitation(req, res) {
    let query = req.query;
    let receiverUsername = query.receiver;
    let receiver = connections.get(receiverUsername);
    let roomName = getRandomRoomName();
    let chatRoomUrl = `/chat-room/${roomName}`;
    let data = JSON.stringify({ chatRoomUrl });

    receiver.sseSend(data);
    res.redirect(chatRoomUrl);
}

function loadChatRoom(req, res) {
    res.render("chat/chat-room", {
        user: {
            username: req.user.username,
            avatarSrc: `/img/user-images/${req.user.avatarName}`
        }
    });
}

module.exports = {
    stream,
    handleInvitation,
    loadChatRoom
};