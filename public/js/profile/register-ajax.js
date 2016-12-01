/* globals $ FormData window */
"use strict";

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
    var pattern = new RegExp(/^[a-zA-Z0-9\._]{3,20}$/, "g"),
        testUsername,
        testFirstName,
        testLastName,
        file = $("#avatar-input")[0].files[0],
        username = $("#tb-username").val(),
        firstname = $("#tb-first-name").val(),
        lastname = $("#tb-last-name").val(),
        password = $("#tb-password").val(),
        confirmPassword = $("tb-confirm-password").val();
    
    testUsername = pattern.test(username);
    testFirstName = pattern.test(firstname);
    testLastName = pattern.test(lastname);

    if (!testUsername) {
        app.notificator.showNotification("Username can contain only letters, numbers and the symbols ._", "error");
        return;
    }

    if (!testFirstName) {
        app.notificator.showNotification("Name can contain only letters, numbers and the symbols ._", "error");
        return;
    }
    if (!testLastName) {
        app.notificator.showNotification("Name can contain only letters, numbers and the symbols ._", "error");
        return;
    }

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
                app.notificator.showNotification(parsedResponse.success, "success");
                setTimeout(() => {
                    window.location.href = "/auth/login";
                }, 1000);
            } else if (parsedResponse.error) {
                app.notificator.showNotification(parsedResponse.error, "error");
            }
        })
        .catch(err => {
            console.log(err);
        });
});