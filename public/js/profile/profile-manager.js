(function(){
    function attachShowArticles(){
        $("#my-articles").on("click", function(){
            $(".articles-holder").show();
            $(".workouts-holder").hide();
        })
    }

    function attachShowWorkouts(){
        $("#my-workouts").on("click", function(){
            $(".articles-holder").hide();
            $(".workouts-holder").show();
        })
    }

    function attachShowFoods(){

    }

    function attachShowFriends(){

    }

    function fixDatepicker(){
        $(".datepicker").datepicker({
            format: "dd/mm/yyyy",
            minDate: 0
        });
    }

    function preventDefaultEventOnSubmint(){
        $("#my-workout-form").on("submit", function(e){
            e.preventDefault();
        });
    }
    
    attachShowWorkouts();
    attachShowArticles();
    attachShowFoods();
    fixDatepicker();
    preventDefaultEventOnSubmint();

}());