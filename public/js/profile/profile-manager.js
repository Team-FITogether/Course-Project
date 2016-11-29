/* globals $ */
"use strict";

$("#my-articles").on("click", () => {
    $(".articles-holder").show();
    $(".workouts-holder").hide();
});

$("#my-workouts").on("click", () => {
    $(".articles-holder").hide();
    $(".workouts-holder").show();
});

$(".datepicker").datepicker({
    format: "dd/mm/yyyy",
    minDate: 0
});

$("#my-workout-form").on("submit", e => {
    e.preventDefault();
});
