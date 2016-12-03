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

    let dateFormat = day + "/" + parsedMonth + "/" + year;
    let dateFormated = `${day  }/${  parsedMonth  }/${  year}`;

    let exerciseOne = $("#exercise-1").val();
    let exerciseTwo = $("#exercise-2").val();
    let exerciseThree = $("#exercise-3").val();
    let exerciseFour = $("#exercise-4").val();
    return {
        date,
        dateFormated
    };
}

function appendWorkoutDiv(dateFormated, exercises) {
    let $divSection = $("<div>").addClass("calendar-section");
    let $divDate = $("<div>").addClass("calendar-date");
    let $spanDate = $("<span>").html(dateFormated);
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
    let valArgs = val.split("|");
    let title = valArgs[0];
    let details = valArgs[1];
    let calories = valArgs[2];

    return {
        title: `${title} ${details}`,
        calories,
        quantity
    };
}

function appendMenuDiv(dateFormated, meals, totalCalories) {
    let $divSection = $("<div>").addClass("calendar-section");
    let $divDate = $("<div>").addClass("calendar-date");
    let $spanDate = $("<span>").html(dateFormated);

    $divDate.append($spanDate);
    $divSection.append($divDate);

    for (let i = 0; i < meals.length; i += 1) {
        if (meals[i].title) {
            let $spanMeal = $("<span>").html(`${meals[i].title} - ${meals[i].calories} кал.`);
            $divSection.append($spanMeal);
            $divSection.append("<br>");
        }
    }

    let $spanTotalCalories = $("<span>").html(`Общо калории за деня: ${totalCalories}`);
    $divSection.append($spanTotalCalories);

    $(".menus-list-holder").append($divSection);
}

function appendFriendshipLink(parentLi, username, userId) {
    let approvedUsername = username;
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
    let $divFriendship = $("<div>");
    let $linkFriendship = $("<a>").addClass("approve-friendship-button");
    $linkFriendship.html(requestedUsername);
    $divFriendship.append($linkFriendship);
    let $waitingFriendshipsDiv = $("#waiting-requests");
    $waitingFriendshipsDiv.append($divFriendship);

    $("#friendship-request-button").html("Приятелство, изчакващо одобрение");
    $("#friendship-request-button").prop("disabled", true);
};

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
        let totalCalories = 0;
        for (let i = 0; i < meals.length; i += 1) {
            if (meals[i].title) {
                totalCalories += +meals[i].calories * meals[i].quantity;
            }
        }
        totalCalories /= 100;
        let data = {
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
});

$("#friendship-request-button").on("click", () => {
    let requestedUsername = $("#invitation-receiver").val();
    //$("#friendship-request").val();
    console.log(requestedUsername);

    let data = {
        requestedUsername
    }
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