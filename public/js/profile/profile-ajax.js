var app = app || {};

(function(){
    $("#add-workout-button").on("click", function(ev){
        let dateString = $("#workout-datepicker").val();
        let dateArr = dateString.split("/");
        let day = dateArr[0];
        let month = dateArr[1] - 1;
        let year = dateArr[2];

        let date = new Date(year, month, day);

        month++;
        let dateFormat = "" + day + "/" + month + "/" + year;

        let exerciseOne = $("#exercise-1").val();
        let exerciseTwo = $("#exercise-2").val();
        let exerciseThree = $("#exercise-3").val();
        let exerciseFour = $("#exercise-4").val();

        let exercises = [];
        exercises.push(exerciseOne);
        exercises.push(exerciseTwo);
        exercises.push(exerciseThree);
        exercises.push(exerciseFour);

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
            }

            app.requester.post("/users/profile/my-workout", data)
                .then(response => {
                    return response.sendStatus(200);
                });
        }
    });
}());
