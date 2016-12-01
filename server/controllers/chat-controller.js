"use strict";

const encryption = require("../utils/encryption");
const FOUND_USER_PROFILE_VIEW = "user/found-user-profile";
const CHAT_ROOM_VIEW = "chat/chat-room";

let connections = new Map();

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

function renderUserOffline(req, res, userValidator, common, data) {
    common.setIsAdminUser(req, userValidator);
    data.getUserByUsername(req.query.receiver)
        .then(foundUser => {
            res.render(FOUND_USER_PROFILE_VIEW, {
                foundUser,
                user: req.user,
                isOffline: true
            });
        })
        .catch(console.log);
}

module.exports = ({ userValidator, common, data }) => {
    return {
        stream(req, res) {
            res.sseSetup();
            if (req.user) {
                connections.set(req.user.username, req.res);
            }
        },
        handleInvitation(req, res) {
            let receiver = connections.get(req.query.receiver);
            let roomName = getRoomName(req.user.username, req.query.receiver);
            let chatRoomUrl = `/chat-room/${roomName}`;
            let jsonData = JSON.stringify({ chatRoomUrl, senderUsername: req.user.username });

            if (!receiver) {
                renderUserOffline(req, res, userValidator, common, data);
            } else {
                receiver.sseSend(jsonData);
                res.redirect(chatRoomUrl);
            }
        },
        loadChatRoom(req, res) {
            res.render(CHAT_ROOM_VIEW, {
                user: {
                    username: req.user.username,
                    avatarSrc: `/img/user-images/${req.user.avatarName}`
                }
            });
        }
    };
};
