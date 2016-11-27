/* globals require module Promise*/
"use strict";

module.exports = function (models) {
    let Calendar = models.Calendar;

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
                Calendar
                    .findOne({ calendarUser: username }, (err, calendar) => {
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
                    calendarUser: calendarUser,
                    workouts: []
                });

                calendar.save((err, createdCalendar) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(createdCalendar);
                });
            });
        },
        updateCalendar(id, update, options) {
            return new Promise((resolve, reject) => {
                Calendar.findOneAndUpdate({ "_id": id }, update, options,
                    (err, calendar) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(calendar);
                    });
            });
        }
    };
};