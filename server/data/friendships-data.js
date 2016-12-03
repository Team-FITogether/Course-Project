/* globals require module Promise*/
"use strict";

module.exports = function(models) {
    let { Friendship } = models;

    return {
        getAllFriendships(username) {
            return new Promise((resolve, reject) => {
                Friendship.find({ $or: [{ "firstUser.username": username }, { "secondUser.username": username }] })
                    .exec((err, friendships) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(friendships);
                    });
            });
        },
        getSingleFriendship(firstUser, secondUser) {
            return new Promise((resolve, reject) => {
                Friendship.findOne({ "firstUser.username": firstUser, "secondUser.username": secondUser }, (err, friendship) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(friendship);
                });
            });
        },
        updateFriendship(friendship) {
            return new Promise((resolve, reject) => {
                friendship.approved = true;
                friendship.save((err, updatedFriednship) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(updatedFriednship);
                });
            });
        },
        addNewFriendships(friendship) {
            return new Promise((resolve, reject) => {
                Friendship.create(friendship, (err, createdFriendship) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(createdFriendship);
                });
            });
        }
    };
};