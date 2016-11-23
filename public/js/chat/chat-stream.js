/* globals EventSource window */

(function () {
    "use strict";

    if (!!window.EventSource) {
        let source = new EventSource("/stream");

        source.addEventListener("message", event => {
            let parsedData = JSON.parse(JSON.parse(event.data));
            let chatRoomUrl = parsedData.chatRoomUrl;

            if (chatRoomUrl) {
                window.location.href = chatRoomUrl;
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