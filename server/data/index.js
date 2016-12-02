/* globals module require __dirname */
"use strict";

const path = require("path");
const fs = require("fs");

module.exports = () => {
    let data = {};
    const Recipe = require("../models/recipe");
    const Article = require("../models/article");
    const ExerciseCategory = require("../models/exercise-category");
    const ExerciseExplanation = require("../models/exercise-explanation");
    const Exercise = require("../models/exercise");
    const Food = require("../models/food");
    const FoodDetails = require("../models/food-details");
    const User = require("../models/user").User;
    const Diet = require("../models/diet");
    const Friendship = require("../models/friendship");

    let models = {
        Recipe,
        Article,
        ExerciseCategory,
        ExerciseExplanation,
        Exercise,
        Food,
        FoodDetails,
        User,
        Diet,
        Friendship
    };

    fs.readdirSync(__dirname)
        .filter(file => file.includes("-data"))
        .forEach(file => {
            let dataModule = require(path.join(__dirname, file))(models);

            Object
                .keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        });

    return data;
};