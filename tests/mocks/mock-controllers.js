module.exports = () => {
    let controllers = {
        articles: {
            loadCreateArticlePage: (req, res) => { },
            loadEditArticlePage: (req, res) => { },
            loadArticlesByGenrePage: (req, res) => { return { req, res } },
            loadSingleArticlePage: (req, res) => { },
            createArticle: (req, res) => { },
            saveEditedArticle: (req, res) => { },
            addComment: (req, res) => { },
            toggleLikeOnArticle: (req, res) => { },
            deleteArticle: (req, res) => { },
            restoreArticle: (req, res) => { }
        },
        auth: {
            registerUser: (req, res) => { },
            loginUser: (req, res) => { },
            loginUserFacebook: (req, res) => { },
            loginUserGoogle: (req, res) => { },
            logoutUser: (req, res) => { },
            loadRegisterPage: (req, res) => { },
            loadLoginPage: (req, res) => { }
        },
        chat: {
            stream: (req, res) => { },
            handleInvitation: (req, res) => { },
            loadChatRoom: (req, res) => { }
        },
        diets: {
            getAllDiets: (req, res) => { },
            getSingleDiet: (req, res) => { },
            addComment: (req, res) => { }
        },
        exercises: {
            getAllExercisesByCategory: (req, res) => { },
            getSingleExercise: (req, res) => { },
            addComment: (req, res) => { },
            getAllCategoriesOfExercise: (req, res) => { }
        },
        foods: {
            getAllFoods: (req, res) => { },
            getSingleFood: (req, res) => { },
            getFoodByCategory: (req, res) => { }
        },
        home: {
            loadHomePage: (req, res) => { }
        },
        recipes: {
            getAllRecipes: (req, res) => { },
            getSingleRecipe: (req, res) => { },
            addComment: (req, res) => { },
            toggleLikeOnRecipe: (req, res) => { }
        },
        searches: {
            findEntities: (req, res) => { }
        },
        user: {
            loadAdminPanel: (req, res) => { },
            loadProfilePage: (req, res) => { },
            loadFoundUserProfilePage: (req, res) => { },
            addWorkoutToUser: (req, res) => { },
            addMenuToUser: (req, res) => { },
            getAllUsers: (req, res) => { },
            addRole: (req, res) => { },
            addNewExerciseCategory: (req, res) => { },
            addNewFoodCategory: (req, res) => { },
            addNewRecipe: (req, res) => { },
            addNewDiet: (req, res) => { }
        }
    };
    return controllers;
}