/* globals $ */
"use strict";

var app = app || {};

$("#add-workout-button").on("click", () => {
    var dateString = $("#workout-datepicker").val(),
        dateArr = dateString.split("/"),
        day = dateArr[0],
        month = dateArr[1] - 1,
        year = dateArr[2],
        date = new Date(year, month, day);

    var parsedMonth = month + 1;
    month = parsedMonth;

    var dateFormat = day + "/" + parsedMonth + "/" + year;

    var exerciseOne = $("#exercise-1").val();
    var exerciseTwo = $("#exercise-2").val();
    var exerciseThree = $("#exercise-3").val();
    var exerciseFour = $("#exercise-4").val();

    var exercises = [];
    exercises.push(exerciseOne);
    exercises.push(exerciseTwo);
    exercises.push(exerciseThree);
    exercises.push(exerciseFour);

    if (date >= Date.now()) {
        var $divSection = $("<div>").addClass("calendar-section"),
            $divDate = $("<div>").addClass("calendar-date"),
            $spanDate = $("<span>").html(dateFormat),
            $spanExerciseOne = $("<span>").html(exerciseOne),
            $spanExerciseTwo = $("<span>").html(exerciseTwo),
            $spanExerciseThree = $("<span>").html(exerciseThree),
            $spanExerciseFour = $("<span>").html(exerciseFour);

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

        var data = {
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