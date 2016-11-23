$(document).ready(function () {
    $.get("/users/all", (body) => {
        var parsed = JSON.parse(body);
        var users = parsed.map((u) => { return u.username });
        $("#users").autocomplete({
            source: users
        });
    })
});