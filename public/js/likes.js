/* globals $ document window  */
$(document).ready(function () {
    const likeInBulgarian = "Харесва ми";
    const unlikeInBulgarian = "Не ми харесва";

    $(".like-button").on("click",
        function (ev) {
            var $target = $(ev.target);
            var targetId = $target.parent().attr("data-id");
            var itemNode = window.location.pathname.split("/")[1];

            $.post("/api/"+ itemNode + "/like", { targetId }, function (success) {
                $target.parent().find(".like-value")
                    .text(success);

                var button = $target.parent().find("a");

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
