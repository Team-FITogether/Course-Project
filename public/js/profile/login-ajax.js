var app = app || {};

$("#btn-login").on("click", (ev) => {
    let username = $("#login-username").val();
    let password = $("#login-password").val();
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    let data = {
        username, password
    }

    app.requester.post("/auth/login", data)
        .then(response => {
            let parsedResponce = JSON.parse(response);

            if (parsedResponce.success) {
                app.notificator.showNotification(parsedResponce.success, "success")
                setTimeout(() => { window.location.href = "/" }, 1000)
            } else if (parsedResponce.error) {
                app.notificator.showNotification(parsedResponce.error, "error")
            }
        })
        .catch(err => {
            console.log(err)
        });
})


