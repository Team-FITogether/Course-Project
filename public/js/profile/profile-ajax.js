/* globals $ */
"use strict";

var app = app || {};

function parseDate(dateString) {
    var dateArr = dateString.split("/"),
    day = +dateArr[0],
    month = +dateArr[1] - 1,
    year = +dateArr[2],

    parsedMonth = month + 1,
    parseDayForHeroku = day + 1,
    dateFormated = `${day  }/${  parsedMonth  }/${  year}`,
    date = new Date(year, month, parseDayForHeroku),

    exerciseOne = $("#exercise-1").val(),
    exerciseTwo = $("#exercise-2").val(),
    exerciseThree = $("#exercise-3").val(),
    exerciseFour = $("#exercise-4").val();
    return {
        date,
        dateFormated
    };
}

function appendWorkoutDiv(dateFormated, exercises) {
    var $divSection = $("<div>").addClass("calendar-section"),
    $divDate = $("<div>").addClass("calendar-date"),
    $spanDate = $("<span>").html(dateFormated);

    $divDate.append($spanDate);
    $divSection.append($divDate);
    for (let i = 0; i < exercises.length; i += 1) {
        let $spanExercise = $("<span>").html(exercises[i]);
        $divSection.append($spanExercise);
        $divSection.append("<br>");
    }
    $(".workout-list-holder").append($divSection);
}

function generateMealInformation(val, quantity) {
    if (!val) {
        return {};
    }
    var valArgs = val.split("|"),
    title = valArgs[0],
    details = valArgs[1],
    calories = valArgs[2];

    return {
        title: `${title} ${details}`,
        calories,
        quantity
    };
}

function appendMenuDiv(dateFormated, meals, totalCalories) {
    var $divSection = $("<div>").addClass("calendar-section"),
    $divDate = $("<div>").addClass("calendar-date"),
    $spanDate = $("<span>").html(dateFormated);

    $divDate.append($spanDate);
    $divSection.append($divDate);

    for (var i = 0; i < meals.length; i += 1) {
        if (meals[i].title) {
            var $spanMeal = $("<span>").html(`${meals[i].title} - ${meals[i].calories} кал.`);
            $divSection.append($spanMeal);
            $divSection.append("<br>");
        }
    }

    var $spanTotalCalories = $("<span>").html(`Общо калории за деня: ${totalCalories}`);
    $divSection.append($spanTotalCalories);

    $(".menus-list-holder").append($divSection);
}

function appendFriendshipLink(parentLi, username, userId) {
    var approvedUsername = username;
    $(parentLi).remove();

    var userLink = "/users?id=" + userId;

    var $li = $("<li />").addClass(".single-friendship-item"),
        $ul = $(".friendship-list-approved"),
        $a = $("<a />").attr("href", userLink).html(approvedUsername);

        $li.append($a);
        $ul.append($li);

  //  let $linkFriendship = $("<a>").addClass("friendship-link");
  //  let $divFriendship = $("<div>");
 //   $linkFriendship.html(approvedUsername);
  //  $divFriendship.append($linkFriendship);
  //  let $friendshipLinksDiv = $("#friendships-links");
   // $friendshipLinksDiv.append($divFriendship);
};

function appendFriendshipRequest(requestedUsername) {
    $("#friendship-request").val("");
    var $divFriendship = $("<div>"),
    $linkFriendship = $("<a>").addClass("approve-friendship-button");
    $linkFriendship.html(requestedUsername);
    $divFriendship.append($linkFriendship);
    var $waitingFriendshipsDiv = $("#waiting-requests");
    $waitingFriendshipsDiv.append($divFriendship);

    $("#friendship-request-button").html("Приятелство, изчакващо одобрение");
    $("#friendship-request-button").prop("disabled", true);
};

$("#add-workout-button").on("click", ev => {
    ev.preventDefault();
    var dateString = $("#workout-datepicker").val(),
    parsedDate = parseDate(dateString);

    var date = parsedDate.date,
    dateFormated = parsedDate.dateFormated,

    exerciseOne = $("#exercise-1").val(),
    exerciseTwo = $("#exercise-2").val(),
    exerciseThree = $("#exercise-3").val(),
    exerciseFour = $("#exercise-4").val();

    var exercises = [exerciseOne, exerciseTwo, exerciseThree, exerciseFour];

    if (date >= Date.now()) {

        let data = {
            date,
            exercises
        };

        app.requester.post("/users/profile/my-workout", data)
            .then(res => {
                appendWorkoutDiv(dateFormated, exercises);
                app.notificator.showNotification("Упражнението е добавено успешно към вашия график!", "success");
            });
    } else {
        app.notificator.showNotification("Изберете валидна дата!", "error");
    }

    return false;
});

$("#add-menu-button").on("click", ev => {
    ev.preventDefault();
    var dateString = $("#foods-datepicker").val(),
    parsedDate = parseDate(dateString),

    date = parsedDate.date,
    dateFormated = parsedDate.dateFormated,

    mealOne = generateMealInformation($("#meal-1").val(), $("#quantity-1").val()),
    mealTwo = generateMealInformation($("#meal-2").val(), $("#quantity-2").val()),
    mealThree = generateMealInformation($("#meal-3").val(), $("#quantity-3").val()),
    mealFour = generateMealInformation($("#meal-4").val(), $("#quantity-4").val()),
    mealFive = generateMealInformation($("#meal-5").val(), $("#quantity-5").val()),
    mealSix = generateMealInformation($("#meal-6").val(), $("#quantity-6").val()),
    mealSeven = generateMealInformation($("#meal-7").val(), $("#quantity-7").val()),
    mealEight = generateMealInformation($("#meal-8").val(), $("#quantity-8").val());

    var meals = [mealOne, mealTwo, mealThree, mealFour, mealFive, mealSix, mealSeven, mealEight];

    if (date >= Date.now()) {
        var totalCalories = 0;
        for (var i = 0; i < meals.length; i += 1) {
            if (meals[i].title) {
                totalCalories += +meals[i].calories * meals[i].quantity;
            }
        }
        totalCalories /= 100;
        var data = {
            date,
            meals,
            totalCalories
        };
        app.requester.post("/users/profile/my-menu", data)
            .then(res => {
                appendMenuDiv(dateFormated, meals, totalCalories);
                app.notificator.showNotification("Менюто е добавено успешно към вашия график!", "success");
            });
    } else {
        app.notificator.showNotification("Изберете валидна дата!", "error");
    }

    return false;
});

$("#friendship-request-button").on("click", () => {
    var requestedUsername = $("#invitation-receiver").val();
    //$("#friendship-request").val();
    console.log(requestedUsername);

    var data = {
        requestedUsername
    };
    app.requester.post("/users/profile/friendship-request", data)
        .then(res => {
            appendFriendshipRequest(requestedUsername);
            app.notificator.showNotification("Поканата е изпратена!", "success");
        });
});

$(".accept-friendship").on("click", (ev) => {
    var $target = $(ev.target),
        $parentLi = $($target).parent(),
        userId = $($parentLi).data("id"),
        approvedUsername = $target.parent().find("a").text(),
        data = { approvedUsername };

    app.requester.post("/users/profile/friendship-approved", data)
        .then(res => {
            appendFriendshipLink($parentLi, approvedUsername, userId);
            app.notificator.showNotification("Приятелството е одобрено!", "success");
        });
});

$(".rejected-friendship").on("click", (ev) => {
    var $target = $(ev.target),
        $parentLi = $($target).parent(),
        disapprovedUsername = $target.parent().find("a").text(),
        data = { disapprovedUsername };
    $($parentLi).remove();

    app.requester.post("/users/profile/friendship-rejected", data)
        .then(res => {
            app.notificator.showNotification("Приятелството на " + disapprovedUsername + " е отказано!", "error");
        });
});