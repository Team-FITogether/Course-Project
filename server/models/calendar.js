"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let calendarSchema = new Schema({
    calendarUser: { type: String, require: true },
    workouts: [{
        date: {
            type: Date
        },
        exercises: []
    }],
    menus: [{
        date: {
            type: Date
        },
        meals: []
    }],   
});

const Calendar = mongoose.model("calendar", calendarSchema);

module.exports = Calendar;