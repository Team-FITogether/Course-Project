/* globals require module Promise*/
"use strict";

const Diet = require("../models/diet");

module.exports = {
    getAllDiets() {
        return new Promise((resolve, reject) => {
            Diet.find((err, diets) => {
                if (err) {
                    return reject(err);
                }

                return resolve(diets);
            });
        });
    },
    getSingleDiet(title) {
        return new Promise((resolve, reject) => {
            Diet.findOne({ title }, (err, diet) => {
                if (err) {
                    return reject(err);
                }

                return resolve(diet);
            });
        });
    },
    getDietById(id) {
        return new Promise((resolve, reject) => {
            Diet.findOne({ "_id": id }, (err, diet) => {
                if (err) {
                    return reject(err);
                }

                return resolve(diet);
            });
        });
    }
};