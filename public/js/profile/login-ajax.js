var app = app || {};

$("#btn-login").on("click", (ev) => {
    let username = $("#login-username").val(),
        password = $("#login-password").val();
    let data = {
        username, password
    }


    app.requester.post("/auth/login", data)
        .then(response => {
            $("body").html(response)
        });
})



