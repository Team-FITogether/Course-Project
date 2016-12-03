"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let friendshipSchema = new Schema({
    firstUser: {
        username: {
            type: String,
            required: true
        },
        _id: {
            type: String,
            required: true
        }
    },
    secondUser: {
        username: {
            type: String,
            required: true
        },
        _id: {
            type: String,
            required: true
        }
    },
    approved: {
        type: Boolean,
        required: true
    },
    isRejected: {
        type: Boolean,
        required: true
    }
});

const Friendship = mongoose.model("friendship", friendshipSchema, "friendships");
module.exports = Friendship;