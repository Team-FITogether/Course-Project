/* globals EventSource window $ */

(function () {
    "use strict";

    function hideParent(targetElement) {
        $(targetElement)
            .parent()
            .hide();
    }

    function getChatroomLink(chatRoomUrl) {
        var $chatRoomLink = $("<a />");
        $chatRoomLink.text("Приеми");
        $chatRoomLink.attr("href", chatRoomUrl);
        $chatRoomLink.attr("target", "_blank");
        $chatRoomLink.on("click", function () {
            hideParent(this);
        });

        return $chatRoomLink;
    }

    function getDeclineLink() {
        var $declineLink = $("<a />");
        $declineLink.text("Откажи");
        $declineLink.attr("href", "#");
        $declineLink.on("click", function () {
            hideParent(this);
        });

        return $declineLink;
    }

    function getHeading(senderUsername) {
        var $heading = $("<h3 />");
        $heading.text(senderUsername + " ви изпрати покана за чат.");

        return $heading;
    }

    function getInvitationWindow($heading, $chatRoomLink, $declineLink) {
        var $invitationWindow = $("<div />");
        $invitationWindow.attr("id", "invitation-window");
        $invitationWindow.addClass("alert alert-success");
        $invitationWindow.append($heading);
        $invitationWindow.append($chatRoomLink);
        $invitationWindow.append($declineLink);

        return $invitationWindow;
    }

    function attachStartChatEvent(source) {
        source.addEventListener("message", event => {
            var parsedData = JSON.parse(JSON.parse(event.data));
            var chatRoomUrl = parsedData.chatRoomUrl;

            if (chatRoomUrl) {
                window.open(chatRoomUrl, "_blank");
            }
        }, false);
    }

    function attachOpenEvent(source) {
        source.addEventListener("open", () => {
            console.log("Connected");
        }, false);
    }

    function attachErrorEvent(source) {
        source.addEventListener("error", event => {
            if (event.target.readyState === EventSource.CLOSED) {
                console.log("Disconnected");
            } else if (event.target.readyState === EventSource.CONNECTING) {
                console.log("Connecting");
            }
        }, false);
    }

    function setupSource() {
        if (window.EventSource) {
            var source = new EventSource("/stream");

            attachStartChatEvent(source);
            attachOpenEvent(source);
            attachErrorEvent(source);
        } else {
            console.log("The browser doesn't support Server-Side-Events :(");
        }
    }

    setupSource();
} ());