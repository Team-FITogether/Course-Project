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

                let avatarPath = `${req.file.destination}/${req.file.filename}`;
                fs.readFile(avatarPath, (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        let userData = {
                            username: body.username,
                            firstname: body.firstname,
                            lastname: body.lastname,
                            avatar: {
                                content: data,
                                mimetype: req.file.mimetype,
                                name: req.file.filename
                            },
                            passHash,
                            salt
                        };

                        let newUser = new User(userData);
                        newUser
                            .save()
                            .then(() => res.redirect("/users/login"), () => {
                                res.status(500);
                                res.send('Registration failed');
                                res.end();
                            });
                    }
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

module.exports = {
    loadRegisterPage,
    loadLoginPage,
    loadAdminPannel,

    registerUser,
    addRole
};