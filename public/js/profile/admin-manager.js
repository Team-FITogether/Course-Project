/* globals $ */
"use strict";

$("#add-role-to-user").on("click", function() {
    $(".add-food-category").hide();
    $(".add-excercise-panel").hide();
    $(".add-new-recipe").hide();
    $(".add-food-diet").hide();
    $(".add-food").hide();

    $(".add-role-panel").show();
});

$("#add-exercise-category").on("click", function() {
    $(".add-role-panel").hide();
    $(".add-food-category").hide();
    $(".add-new-recipe").hide();
    $(".add-food-diet").hide();
    $(".add-food").hide();

    $(".add-excercise-panel").show();
});

$("#add-food-category").on("click", function() {
    $(".add-role-panel").hide();
    $(".add-excercise-panel").hide();
    $(".add-food").hide();
    $(".add-new-recipe").hide();
    $(".add-food-diet").hide();

    $(".add-food-category").show();
});

$("#add-recipe").on("click", function() {
    $(".add-role-panel").hide();
    $(".add-excercise-panel").hide();
    $(".add-food").hide();
    $(".add-food-diet").hide();
    $(".add-food-category").hide();

    $(".add-new-recipe").show();
});

$("#add-food-diet").on("click", function() {
    $(".add-role-panel").hide();
    $(".add-excercise-panel").hide();
    $(".add-food").hide();
    $(".add-food-category").hide();
    $(".add-new-recipe").hide();

    $(".add-food-diet").show();
});

$("#add-food").on("click", function() {
    $(".add-role-panel").hide();
    $(".add-excercise-panel").hide();
    $(".add-food-category").hide();
    $(".add-new-recipe").hide();
    $(".add-food-diet").hide();

    $(".add-food").show();
});