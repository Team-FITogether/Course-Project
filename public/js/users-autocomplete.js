/* globals $ document */
"use strict";

$(document).ready(() => {
    $.get("/users/all",
        (body) => {
            let parsed = JSON.parse(body);
            let users = parsed.map((u) => u.username);
            $("#users").autocomplete({ source: users });
        });
});