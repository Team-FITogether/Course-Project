/* globals io window $ */

(function() {
    "use strict";

    let socket = io.connect();
    let pathName = window.location.pathname;
    let lastIndexOfForwardSlash = pathName.lastIndexOf("/");
    let roomName = pathName.substr(lastIndexOfForwardSlash + 1);

    let $li = $("<li />");
    let $avatar = $("<img />");
    let $message = $("<span />");
    let $allMessages = $("#messages");
    let $messageContainer = $("<div />");

    $avatar.addClass("chat-avatar");
    $message.addClass("chat-message");
    $messageContainer.addClass("message-container");
    $allMessages.attr("id", "all-messages-container");

    function attachSubmitFormEvent(username, avatarSrc) {
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
    }

    function attachChatMessageEvent(username) {
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
    }

    function attachFullRoomEvent() {
        socket.on("full room", () => {
            $("body")
                .empty()
                .text("ROOM IS FULL");
        });
    }

    let isScrolled = false;

    function updateScroll() {
        let allMessages = $("#all-messages-container")[0];
        if (!isScrolled) {
            allMessages.scrollTop = allMessages.scrollHeight;
        }
    }

    function renderMessages(username) {
        $allMessages.hide().empty();
        socket.on("render messages", messages => {
            for (let message of messages) {
                let $currentLi = $li.clone();
                let $currentMessage = $message.clone();
                let $currentAvatar = $avatar.clone();
                let $currentMessageContainer = $messageContainer.clone();

                if (message.author === username) {
                    $currentMessageContainer.addClass("right");
                } else {
                    $currentMessageContainer.addClass("left");
                }

                $currentMessage.text(message.content);
                $currentAvatar.attr("src", message.avatarSrc);
                $currentMessageContainer.append($currentAvatar);
                $currentMessageContainer.append($currentMessage);
                $currentLi.append($currentMessageContainer);
                $allMessages.append($currentLi);
            }

            $allMessages.show();
        });
    }

    socket.on("connect", () => {
        socket.emit("room", roomName);

        const username = $("#username-holder").attr("username");
        const avatarSrc = $("#avatarSrc-holder").attr("avatar-src");

        renderMessages(username);
        attachSubmitFormEvent(username, avatarSrc);
        attachChatMessageEvent(username);
        attachFullRoomEvent();
    });
} ());