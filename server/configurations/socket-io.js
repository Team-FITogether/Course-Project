"use strict";

const Chat = require("../models/chat");

function getUsersCountInRoom(io, roomName) {
    let namespace = "/";
    let room = io.nsps[namespace].adapter.rooms[roomName];
    if (!room) {
        return null;
    }

    return room.length;
}

module.exports = io => {
    io.on("connection", socket => {
        socket.on("room", room => {
            let usersInRoom = getUsersCountInRoom(io, room);
            if (usersInRoom < 2) {
                Chat.findOrCreate({ name: room }, (err, data) => {
                    if (err) {
                        console.log(err);
                    }

                    socket.join(room);
                    socket.emit("render messages", data.messages);
                });
            } else {
                socket.emit("full room");
            }
        });

        socket.on("chat message to room", data => {
            Chat.findOneAndUpdate({
                name: data.room
            },
                {
                    $push: {
                        messages: {
                            author: data.sender,
                            content: data.message,
                            avatarSrc: data.avatarSrc
                        }
                    }
                }, err => {
                    if (err) console.log(err);
                });

            io.to(data.room).emit("chat message", data);
        });
    });
};