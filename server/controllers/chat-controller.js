"use strict";

const encryption = require("../utils/encryption");
const mongoose = require("mongoose");
const User = mongoose.model("user");

let connections = new Map();

const data = require("./../data")({ User });

function getRoomName(firstUsername, secondUsername) {
    let name = [firstUsername, secondUsername]
        .sort((a, b) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        })
        .join("");
    let hashedName = encryption.getPassHash("", name);
    return hashedName;
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
    let roomName = getRoomName(req.user.username, receiverUsername);
    let chatRoomUrl = `/chat-room/${roomName}`;
    let jsonData = JSON.stringify({ chatRoomUrl, senderUsername: req.user.username });

    if (!receiver) {
        let user = req.user;
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;

        data.getUserByUsername(req.query.receiver)
            .then(foundUser => {
                res.render("user/found-user-profile", {
                    foundUser,
                    user,
                    isOffline: true
                });
            })
            .catch(console.log);
    } else {
        receiver.sseSend(jsonData);
        res.redirect(chatRoomUrl);
    }
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