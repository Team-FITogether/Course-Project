/* globals io window $ */

(function() {
    "use strict";

    var socket = io.connect();
    var pathName = window.location.pathname;
    var lastIndexOfForwardSlash = pathName.lastIndexOf("/");
    var roomName = pathName.substr(lastIndexOfForwardSlash + 1);

    var $form = $("form");
    var $messageBox = $("#tb-message");

    function attachSubmitFormEvent(username, avatarSrc) {
        $form.on("submit", () => {
            var message = $messageBox.val();
            var data = {
                sender: username,
                room: roomName,
                message,
                avatarSrc
            };

            socket.emit("chat message to room", data);
            $messageBox.val("");
            return false;
        });
    }

    var $li = $("<li />");
    var $avatar = $("<img />");
    var $message = $("<span />");
    var $allMessages = $("#messages");
    var $messageContainer = $("<div />");
    $avatar.addClass("chat-avatar img-responsive img-circle");
    $message.addClass("chat-message");
    $messageContainer.addClass("message-container");
    $allMessages.attr("id", "all-messages-container");

    function attachChatMessageEvent(username) {
        socket.on("chat message", data => {
            var $currentLi = $li.clone(true);
            var $currentMessage = $message.clone();
            var $currentAvatar = $avatar.clone();
            var $currentMessageContainer = $messageContainer.clone();

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

    function updateScroll() {
        setInterval(() => {
            $allMessages[0].scrollTop = $allMessages[0].scrollHeight;
        }, 1000);
    }

    function renderMessages(username) {
        $allMessages.hide().empty();
        socket.on("render messages", messages => {
            var $messagesToAppend = [];
            for (var message of messages) {
                var $currentLi = $li.clone();
                var $currentMessage = $message.clone();
                var $currentAvatar = $avatar.clone();
                var $currentMessageContainer = $messageContainer.clone();

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
                $messagesToAppend.push($currentLi);
            }

            $allMessages.append($messagesToAppend);
            $allMessages.show();
        });
    }

    var $usernameHolder = $("#username-holder");
    var $avatarSrcHolder = $("#avatarSrc-holder");

    socket.on("connect", () => {
        socket.emit("room", roomName);

        const username = $usernameHolder.attr("username");
        const avatarSrc = $avatarSrcHolder.attr("avatar-src");

        renderMessages(username);
        attachSubmitFormEvent(username, avatarSrc);
        attachChatMessageEvent(username);
        attachFullRoomEvent();
        updateScroll();
    });
}());