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

    let dateFormated = `${day  }/${  parsedMonth  }/${  year}`;

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

function generateMealInformation(val, quntity) {
    if (!val) {
        return {};
    }
    let valArgs = val.split("|");
    let title = valArgs[0];
    let details = valArgs[1];
    let calories = valArgs[2];

    console.log(details);
    return {
        title: `${title} ${details}`,
        calories,
        quntity
    };
}

function appendMenuDiv(dateFormated, meals) {
    let $divSection = $("<div>").addClass("calendar-section");
    let $divDate = $("<div>").addClass("calendar-date");
    let $spanDate = $("<span>").html(dateFormated);
    let totalCalories = 0;

    $divDate.append($spanDate);
    $divSection.append($divDate);

    for (let i = 0; i < meals.length; i += 1) {
        if (meals[i].title) {
            let $spanMeal = $("<span>").html(`${meals[i].title} - ${meals[i].calories}`);
            totalCalories += +meals[i].calories * meals[i].quntity;
            $divSection.append($spanMeal);
            $divSection.append("<br>");
        }
    }

    let $spanTotalCalories = $("<span>").html(`Total calories for the day: ${totalCalories}`);
    $divSection.append($spanTotalCalories);

    $(".menus-list-holder").append($divSection);
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
        let exercisesParams = { exerciseOne, exerciseTwo, exerciseThree, exerciseFour };

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

    let mealOne = generateMealInformation($("#meal-1").val(), $("#quantity-1").val());
    let mealTwo = generateMealInformation($("#meal-2").val(), $("#quantity-2").val());
    let mealThree = generateMealInformation($("#meal-3").val(), $("#quantity-3").val());
    let mealFour = generateMealInformation($("#meal-4").val(), $("#quantity-4").val());
    let mealFive = generateMealInformation($("#meal-5").val(), $("#quantity-5").val());
    let mealSix = generateMealInformation($("#meal-6").val(), $("#quantity-6").val());
    let mealSeven = generateMealInformation($("#meal-7").val(), $("#quantity-7").val());
    let mealEight = generateMealInformation($("#meal-8").val(), $("#quantity-8").val());

    let meals = [mealOne, mealTwo, mealThree, mealFour, mealFive, mealSix, mealSeven, mealEight];

    if (date >= Date.now()) {
        appendMenuDiv(dateFormated, meals);

        let data = {
            date,
            meals
        };
        app.requester.post("/users/profile/my-menu", data)
            .then(res => {
                console.log(res);
                app.notificator.showNotification("Менюто е добавено успешно към вашия график!", "success");
            });
    } else {
        app.notificator.showNotification("Изберете валидна дата!", "error");
    }
});