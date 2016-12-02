/* globals $ */
"use strict";

$("#my-friendships").on("click", () => {
    $(".articles-holder").hide();
    $(".workouts-holder").hide();
    $(".foods-holder").hide();
    $(".friendships-holder").show();
});

$("#my-articles").on("click", () => {
    $(".articles-holder").show();
    $(".workouts-holder").hide();
    $(".foods-holder").hide();
    $(".friendships-holder").hide();
});

$("#my-workouts").on("click", () => {
    $(".workouts-holder").show();
    $(".foods-holder").hide();
    $(".articles-holder").hide();
    $(".friendships-holder").hide();
});

$("#my-foods").on("click", () => {
    $(".foods-holder").show();
    $(".articles-holder").hide();
    $(".workouts-holder").hide();
    $(".friendships-holder").hide();
});

$(".datepicker").datepicker({
    format: "dd/mm/yyyy",
    minDate: 0
});

$("#my-workout-form").on("submit", e => {
    e.preventDefault();
});
