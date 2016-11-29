var app = app || {};

$("#register-form").on("submit", function (e) {
    let formData = new FormData(this);
    console.log(formData)
    $.ajax({
        url: "/auth/register",
        async: true,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (r) { console.log(r) },
        error: function (e) { console.log(e) }
    });
    e.preventDefault();
})

// $("#btn-register").on("click", event => {
//     let formData = {
//         username: $("#tb-username").val(),
//         firstname: $("#tb-first-name").val(),
//         lastname: $("#tb-last-name").val(),
//         password: $("#tb-paswword").val(),
//         confirmPassword: $("#tb-confirm-paswword").val(),
//         avatar: $("#avatar-input").val(),
//     }
//     console.log(formData)
//     $.ajax({
//         async: true,
//         url: "/auth/register",
//         type: "POST",
//         data: formData,
//         mimeType: "multipart/form-data",
//         contentType: false,
//         cache: false,
//         processData: false,
//         success: function (r) { console.log(r) },
//         error: function (e) { console.log(e) }
//     });
// });

