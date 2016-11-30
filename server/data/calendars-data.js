/* globals require module Promise*/
"use strict";

// const Calendar = require("../models/calendar");

module.exports = function(models) {
    let { Calendar } = models;

    return {
        getCalendarById(id) {
            return new Promise((resolve, reject) => {
                Calendar.findOne({ "_id": id }, (err, calendar) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(calendar);
                });
            });
        },
        getCalendarByUser(username) {
            return new Promise((resolve, reject) => {
                Calendar.findOne({ calendarUser: username }, (err, calendar) => {
                    if (err) {
                        console.log('Calendar is not found');
                        return reject(err);
                    }
                    return resolve(calendar);
                });
            });
        },
        createCalendar(calendarUser) {
            return new Promise((resolve, reject) => {
                let calendar = new Calendar({
                    calendarUser,
                    workouts: [],
                    menus: []
                });

                calendar.save((err, createdCalendar) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(createdCalendar);
                });
            });
        },
        updateCalendar(username, update, options) {
            return new Promise((resolve, reject) => {
                Calendar.findOneAndUpdate({ "calendarUser": username }, update, options, (err, calendar) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(calendar);
                });
            });
        }
    };
};