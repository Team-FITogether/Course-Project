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

    attachShowWorkouts();
    attachShowArticles();
    attachShowFoods();
}());