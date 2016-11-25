/* globals EventSource window $ */

(function() {
    "use strict";

    function hideParent(targetElement) {
        $(targetElement)
            .parent()
            .hide();
    }

    function getChatroomLink(chatRoomUrl) {
        let $chatRoomLink = $("<a />");
        $chatRoomLink.text("Приеми");
        $chatRoomLink.attr("href", chatRoomUrl);
        $chatRoomLink.attr("target", "_blank");
        $chatRoomLink.on("click", function() {
            hideParent(this);
        });

        return $chatRoomLink;
    }

    function getDeclineLink() {
        let $declineLink = $("<a />");
        $declineLink.text("Откажи");
        $declineLink.attr("href", "#");
        $declineLink.on("click", function() {
            hideParent(this);
        });

        return $declineLink;
    }

    function getHeading(senderUsername) {
        let $heading = $("<h3 />");
        $heading.text(`${senderUsername} ви изпрати покана за чат.`);

        return $heading;
    }

    function getInvitationWindow($heading, $chatRoomLink, $declineLink) {
        let $invitationWindow = $("<div />");
        $invitationWindow.attr("id", "invitation-window");
        $invitationWindow.addClass("alert alert-success");
        $invitationWindow.append($heading);
        $invitationWindow.append($chatRoomLink);
        $invitationWindow.append($declineLink);

        return $invitationWindow;
    }

    function getMainInvitationWindow() {
        let $mainInvitationWindow = $("<div />");
        $mainInvitationWindow.attr("id", "main-invitation-window");
        $mainInvitationWindow.addClass("row");
        $("body").append($mainInvitationWindow);

        return $mainInvitationWindow;
    }

    function attachMessageEvent(source) {
        let $mainInvitationWindow = getMainInvitationWindow();

        source.addEventListener("message", event => {
            let parsedData = JSON.parse(JSON.parse(event.data));
            let chatRoomUrl = parsedData.chatRoomUrl;

            if (chatRoomUrl) {
                let $heading = getHeading(parsedData.senderUsername);
                let $chatRoomLink = getChatroomLink(chatRoomUrl);
                let $declineLink = getDeclineLink();
                let $invitationWindow = getInvitationWindow($heading, $chatRoomLink, $declineLink);
                $mainInvitationWindow.append($invitationWindow);
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
            let source = new EventSource("/stream");

            attachMessageEvent(source);
            attachOpenEvent(source);
            attachErrorEvent(source);
        } else {
            console.log("The browser doesn't support Server-Side-Events :(");
        }
    }

    setupSource();
} ());