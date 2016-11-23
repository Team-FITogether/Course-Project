/* globals io window $ */

let socket = io.connect();
let pathName = window.location.pathname;
let lastIndexOfForwardSlash = pathName.lastIndexOf("/");
let roomName = pathName.substr(lastIndexOfForwardSlash + 1);

socket.on("connect", () => {
    socket.emit("room", roomName);

    const username = $("#username-holder").attr("username");
    const avatarSrc = $("#avatarSrc-holder").attr("avatar-src");

    $("form").on("submit", () => {
        let message = $("#tb-message").val();
        let data = {
            room: roomName,
            message
        };

        socket.emit("chat message to room", data);
        $("#tb-message").val("");
        return false;
    });

    let $li = $("<li />");
    let $avatar = $("<img />");
    let $message = $("<span />");
    let $allMessages = $("#messages");
    $avatar.attr("src", avatarSrc);
    $avatar.addClass("img img-responsive img-circle chat-avatar");
    $message.addClass("chat-message");
    $li.append($avatar);

    socket.on("chat message", message => {
        let $currentLi = $li.clone(true);
        let $currentMessage = $message.clone();

        $currentMessage.text(message);
        $currentLi.append($currentMessage);
        $allMessages.append($currentLi);
    });

    socket.on("full room", () => {
        $("body")
            .empty()
            .text("ROOM IS FULL");
    });
});