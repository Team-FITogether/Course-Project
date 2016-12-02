"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let friendshipSchema = new Schema({
    firstUser: {
        type: String,
        required: true
    },
    secondUser: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        required: true
    }
});

const Friendship = mongoose.model("friendship", friendshipSchema, "friendships");
module.exports = Friendship;