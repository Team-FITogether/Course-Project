"use strict";

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
                socket.join(room);
            } else {
                socket.emit("full room");
            }
        });

        socket.on("chat message to room", data => {
            io.to(data.room).emit("chat message", data.message);
        });
    });
};