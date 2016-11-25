/* globals EventSource window $ */

(function () {
    "use strict";

    if (!!window.EventSource) {
        let source = new EventSource("/stream");

        source.addEventListener("message", event => {
            let parsedData = JSON.parse(JSON.parse(event.data));
            let chatRoomUrl = parsedData.chatRoomUrl;

            if (chatRoomUrl) {
                let $invitationWindow = $("<div />");
                let $heading = $("<h3 />");
                let $chatRoomLink = $("<a />");

                $heading.text(`${parsedData.senderUsername} ви изпрати покана за чат.`);
                $chatRoomLink.text("Приеми");
                $chatRoomLink.attr("href", chatRoomUrl);
                $invitationWindow.append($heading);
                $invitationWindow.append($chatRoomLink);
                $("body").append($invitationWindow);
            }
        }, false);

        source.addEventListener("open", () => {
            console.log("Connected");
        }, false);

        source.addEventListener("error", event => {
            if (event.target.readyState === EventSource.CLOSED) {
                console.log("Disconnected");
            } else if (event.target.readyState === EventSource.CONNECTING) {
                console.log("Connecting");
            }
        }, false);
    } else {
        console.log("The browser doesn't support Server-Side-Events :(");
    }
} ());