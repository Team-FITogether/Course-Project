var app = app || {};

$("document").ready(() => {
    "use strict";

    const MIN_SEARCH_STRING_LENGTH = 3,
        INVALID_SEARCH_STRING_LENGTH = "Стойността за търсене трябва да бъде поне 3 символа.",
        ERROR_TYPE = "error";

    let $searchBtn = $("#btn-search"),
        $searchInput = $("#tb-search"),
        $searchForm = $("#search-form");

    $searchForm.on("submit", () => {
        if ($searchInput.val().length < MIN_SEARCH_STRING_LENGTH) {
            app.notificator.showNotification(INVALID_SEARCH_STRING_LENGTH, ERROR_TYPE);
            return false;
        }

        return true;
    });
});