/* globals $ */
"use strict";

var app = app || {};

function parseDate(dateString) {
    let dateArr = dateString.split("/");
    let day = dateArr[0];
    let month = dateArr[1] - 1;
    let year = dateArr[2];

    let date = new Date(year, month, day);

    let parsedMonth = month + 1;
    month = parsedMonth;

    let dateFormated = day + "/" + parsedMonth + "/" + year;

    return {
        date,
        dateFormated
    };
}

function appendWorkoutDiv(dateFormated, exercisesParams) {
    let $divSection = $("<div>").addClass("calendar-section");
    let $divDate = $("<div>").addClass("calendar-date");
    let $spanDate = $("<span>").html(dateFormated);
    let $spanExerciseOne = $("<span>").html(exercisesParams.exerciseOne);
    let $spanExerciseTwo = $("<span>").html(exercisesParams.exerciseTwo);
    let $spanExerciseThree = $("<span>").html(exercisesParams.exerciseThree);
    let $spanExerciseFour = $("<span>").html(exercisesParams.exerciseFour);

    $divDate.append($spanDate);

    $divSection.append($divDate);
    $divSection.append($spanExerciseOne);
    $divSection.append("<br>");
    $divSection.append($spanExerciseTwo);
    $divSection.append("<br>");
    $divSection.append($spanExerciseThree);
    $divSection.append("<br>");
    $divSection.append($spanExerciseFour);

    $(".workout-list-holder").append($divSection);
}

function generateMealInformation(title, calories) {
    return {
        title,
        calories
    };
}

$("#add-workout-button").on("click", () => {
    let dateString = $("#workout-datepicker").val();
    let parsedDate = parseDate(dateString);

    let date = parsedDate.date;
    let dateFormated = parsedDate.dateFormated;

    let exerciseOne = $("#exercise-1").val();
    let exerciseTwo = $("#exercise-2").val();
    let exerciseThree = $("#exercise-3").val();
    let exerciseFour = $("#exercise-4").val();

    let exercises = [exerciseOne, exerciseTwo, exerciseThree, exerciseFour];

    if (date >= Date.now()) {
        let exercisesParams = {
            exerciseOne,
            exerciseTwo,
            exerciseThree,
            exerciseFour
        };

        appendWorkoutDiv(dateFormated, exercisesParams);

        let data = {
            date,
            exercises
        };

        app.requester.post("/users/profile/my-workout", data)
            .then(res => {
                console.log(res);
                app.notificator.showNotification("Упражнението е добавено успешно към вашия график!", "success");
            });
    } else {
        app.notificator.showNotification("Изберете валидна дата!", "error");
    }
});

$("#add-menu-button").on("click", () => {
    let dateString = $("#foods-datepicker").val();
    let parsedDate = parseDate(dateString);

    let date = parsedDate.date;
    let dateFormated = parsedDate.dateFormated;

    let mealOne = generateMealInformation($("#meal-1").val(), $("#meal-1").html());
    let mealTwo = generateMealInformation($("#meal-2").val(), $("#meal-2").html());
    let mealThree = generateMealInformation($("#meal-3").val(), $("#meal-3").html());
    let mealFour = generateMealInformation($("#meal-4").val(), $("#meal-4").html());
    let mealFive = generateMealInformation($("#meal-5").val(), $("#meal-5").html());
    let mealSix = generateMealInformation($("#meal-6").val(), $("#meal-6").html());
    let mealSeven = generateMealInformation($("#meal-7").val(), $("#meal-7").html());
    let mealEight = generateMealInformation($("#meal-8").val(), $("#meal-8").html());

    let meals = [];

    if (date >= Date.now()) {
        let $divSection = $("<div>").addClass("calendar-section");
        let $divDate = $("<div>").addClass("calendar-date");
        let $spanDate = $("<span>").html(dateFormat);
        let $spanExerciseOne = $("<span>").html(exerciseOne);
        let $spanExerciseTwo = $("<span>").html(exerciseTwo);
        let $spanExerciseThree = $("<span>").html(exerciseThree);
        let $spanExerciseFour = $("<span>").html(exerciseFour);

        $divDate.append($spanDate);

        $divSection.append($divDate);
        $divSection.append($spanExerciseOne);
        $divSection.append("<br>");
        $divSection.append($spanExerciseTwo);
        $divSection.append("<br>");
        $divSection.append($spanExerciseThree);
        $divSection.append("<br>");
        $divSection.append($spanExerciseFour);

        $(".workout-list-holder").append($divSection);

        let data = {
            date,
            exerciseOne,
            exerciseTwo,
            exerciseThree,
            exerciseFour
        };

        app.requester.post("/users/profile/my-workout", data)
            .then(res => {
                console.log(res);
                app.notificator.showNotification("Упражнението е добавено успешно към вашия график!", "success");
            });
    } else {
        app.notificator.showNotification("Изберете валидна дата!", "error");
    }
});

