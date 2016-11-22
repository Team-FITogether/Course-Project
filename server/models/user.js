"use strict";

const mongoose = require("mongoose");
const encryption = require("../utils/encryption");

const userSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    passHash: { type: String, required: true },
    salt: { type: String, required: true },
    age: { type: Number },
    roles: [String],
    avatarName: String
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

module.exports = { addAdminUser };