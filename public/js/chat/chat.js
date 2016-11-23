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
            sender: username,
            room: roomName,
            message,
            avatarSrc
        };

        socket.emit("chat message to room", data);
        $("#tb-message").val("");
        return false;
    });

    let $li = $("<li />");
    let $avatar = $("<img />");
    let $message = $("<span />");
    let $allMessages = $("#messages");
    let $messageContainer = $("<div />");
    $avatar.addClass("img img-responsive img-circle chat-avatar");
    $message.addClass("chat-message");
    $messageContainer.append($avatar);
    $messageContainer.addClass("message-container");

    socket.on("chat message", data => {
        let $currentLi = $li.clone(true);
        let $currentMessage = $message.clone();
        let $currentAvatar = $avatar.clone();
        let $currentMessageContainer = $messageContainer.clone();

        if (data.sender === username) {
            $currentMessageContainer.addClass("right");
        } else {
            $currentMessageContainer.addClass("left");
        }

        $currentAvatar.attr("src", data.avatarSrc);
        $currentMessageContainer.append($currentAvatar);
        $currentMessage.text(data.message);
        $currentMessageContainer.append($currentMessage);
        $currentLi.append($currentMessageContainer);
        $allMessages.append($currentLi);
    });

    socket.on("full room", () => {
        $("body")
            .empty()
            .text("ROOM IS FULL");
    });
});