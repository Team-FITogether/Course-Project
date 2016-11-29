var app = app || {};

// $("#register-form").on("submit", function (e) {
//     let formData = new FormData(this);
//     console.log(formData)
//     $.ajax({
//         url: "/auth/register",
//         async: true,
//         type: 'POST',
//         data: formData,
//         processData: false,
//         contentType: false,
//         success: function (r) { console.log(r) },
//         error: function (e) { console.log(e) }
//     });
//     e.preventDefault();
// })

$("#btn-register").on("click", event => {

    let file = $("#avatar-input")[0].files[0];
    let username = $("#tb-username").val();
    let firstname = $("#tb-first-name").val();
    let lastname = $("#tb-last-name").val();
    let password = $("#tb-password").val();
    let confirmPassword = $("tb-confirm-password").val();
    let formData = new FormData();
    formData.append("avatar", file);
    formData.append("username", username);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    app.requester.postWithFile("/auth/register", formData)
        .then(response => {
            let parsedResponse = JSON.parse(response);
            if (parsedResponse.success) {
                app.notificator.showNotification(parsedResponse.success, "success")
                setTimeout(() => { window.location.href = "/auth/login" }, 1000);
            } else if (parsedResponse.error) {
                app.notificator.showNotification(parsedResponse.error, "error")
            }
        })
        .catch(err => {
            console.log(err)
        });
});

