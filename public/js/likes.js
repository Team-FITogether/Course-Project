$(document).ready(() => {
    let genre = getParameterByName("genre", window.location.href);
    let username = $("#username").text();

    $.post("/api/articles", { genre }, (success) => {
        var articles = JSON.parse(success);

        for (let i = 0; i < articles.length; i++) {
            let currentArticle = articles[i];

            for (let j = 0; j < currentArticle.usersLiked.length; j++) {
                if (currentArticle.usersLiked[j].user === username) {
                    let element = $(`div [data-id="${currentArticle._id}"]`);
                    let button = element.find("a").removeClass();
                    button.addClass("btn btn-sm btn-primary like-button");
                    button.text("Unlike");
                }
            }
        }
    });

    $(".like-button").on("click",
        (ev) => {
            let $target = $(ev.target);
            let targetId = $target.parent().attr("data-id");

            $.post("/api/articles/like", { targetId }, (success) => {
                $target.parent().find(".like-value").text(success);
                let button = $target.parent().find("a");

                if (button.text() === "Like") {
                    button.removeClass();
                    button.addClass("btn btn-sm btn-primary like-button");
                    button.text("Unlike");
                } else {
                    button.removeClass();
                    button.addClass("btn btn-sm btn-success like-button");
                    button.text("Like");
                }
            });
        });

    function getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return "";
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
});
