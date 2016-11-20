"use strict";

const mongoose = require("mongoose");
const User = mongoose.model("user");
const encryption = require("../utils/encryption");
const fs = require("fs");

function loadRegisterPage(req, res) {
    res.render("user/register");
}

function loadLoginPage(req, res) {
    res.render("user/login");
}

function loadAdminPannel(req, res) {
    res.render("admin-area/admin-pannel");
}

function registerUser(req, res) {
    const body = req.body;

    User
        .findOne({ username: body.username })
        .then(user => {
            if (!user) {
                let salt = encryption.getSalt();
                let passHash = encryption.getPassHash(salt, body.password);
                let userData = {
                    username: body.username,
                    firstname: body.firstname,
                    lastname: body.lastname,
                    avatarName: req.file.filename,
                    passHash,
                    salt
                };

                let newUser = new User(userData);
                newUser
                    .save()
                    .then(() => res.redirect("/users/login"), () => {
                        res.status(500);
                        res.send("Registration failed");
                        res.end();
                    });
            } else {
                res.status(409);
                res.send("User already exists.");
                res.end();
            }
        });
}

function addRole(req, res) {
    let body = req.body;
    let query = { username: body.username };
    User.findOneAndUpdate(query, {
        $push: {
            "roles": body.role
        }
    }, (err, response) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
}

function loadProfilePage(req, res) {
    res.render("user/profile", {
        avatarName: req.user.avatarName,
        username: req.user.username
    });
}

module.exports = {
    loadRegisterPage,
    loadLoginPage,
    loadAdminPannel,
    loadProfilePage,

    registerUser,
    addRole
};