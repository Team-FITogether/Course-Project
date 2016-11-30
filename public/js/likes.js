/* globals $ document  */
$(document).ready(() => {
    const likeInBulgarian = "Харесва ми";
    const unlikeInBulgarian = "Не ми харесва";

    $(".like-button").on("click",
        (ev) => {
            let $target = $(ev.target);
            let targetId = $target.parent().attr("data-id");

            $.post("/api/articles/like", { targetId }, (success) => {
                $target.parent().find(".like-value")
                    .text(success);

                let button = $target.parent().find("a");

                if (button.text() === likeInBulgarian) {
                    button.removeClass();
                    button.addClass("btn btn-sm btn-primary like-button");
                    button.text(unlikeInBulgarian);
                } else {
                    button.removeClass();
                    button.addClass("btn btn-sm btn-success like-button");
                    button.text(likeInBulgarian);
                }
            });
        });
});
