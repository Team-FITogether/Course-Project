"use strict";

const mongoose = require("mongoose");
const encryption = require("../utils/encryption");
const validationConstants = require("../utils/validation-constants");

const userSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true, minlength: validationConstants.MIN_LENGTH, maxlength: validationConstants.MAX_USER_NAME_LENGTH },
    firstname: { type: String, required: true, minlength: validationConstants.MIN_LENGTH, maxlength: validationConstants.MAX_USER_NAME_LENGTH },
    lastname: { type: String, required: true, minlength: validationConstants.MIN_LENGTH, maxlength: validationConstants.MAX_USER_NAME_LENGTH },
    passHash: { type: String, required: true },
    salt: { type: String, required: true },
    facebookId: { type: String },
    facebookToken: { type: String },
    googleId: { type: String },
    googleToken: { type: String },
    age: { type: Number, min: validationConstants.MIN_NUMBER },
    roles: [String],
    avatarName: { type: String, default: "default-profile.png", minlength: validationConstants.MIN_LENGTH },
    calendar: {
        workouts: [{}],
        menus: [{}]
    }
});

userSchema.methods = {
    isValidPassword(password) {
        let realPassHash = this.passHash;
        let currentPassHash = encryption.getPassHash(this.salt, password);
        let isValid = currentPassHash === realPassHash;

        return isValid;
    }
};

const User = mongoose.model("user", userSchema);

function addAdminUser() {
    User.find({ username: "admin" })
        .then(user => {
            if (!user.length) {
                let salt = encryption.getSalt();
                let passHash = encryption.getPassHash(salt, "admin");
                let adminUser = new User({
                    username: "admin",
                    salt,
                    passHash,
                    roles: ["admin"]
                });

                adminUser.save();
            }
        })
        .catch(console.log);
}

module.exports = { User, addAdminUser };