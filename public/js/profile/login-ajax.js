var app = app || {};

$("#btn-login").on("click", (ev) => {
    let username = $("#login-username").val(),
        password = $("#login-password").val();
    let data = {
        username, password
    }

    app.requester.post("/auth/login", data)
        .then(response => {
            let parsedResponce = JSON.parse(response);
            
            if (parsedResponce.success) {
                app.notificator.showNotification(parsedResponce.success, "success")
                setTimeout(() => { window.location.href = "/" }, 1500)
            } else if (parsedResponce.error) {
                app.notificator.showNotification(parsedResponce.error, "error")
            }
        })
        .catch(err => {
            console.log(err)
        });
})



