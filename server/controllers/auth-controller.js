"use strict";

const mongoose = require("mongoose");
const User = mongoose.model("user");
const encryption = require("../utils/encryption");
const passport = require("passport");

function registerUser(req, res) {
    const body = req.body;

    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    User
        .findOne({ username: body.username })
        .then(foundUser => {
            if (!foundUser) {
                let salt = encryption.getSalt();
                let passHash = encryption.getPassHash(salt, body.password);
                let newUserData = {
                    username: body.username,
                    firstname: body.firstname,
                    lastname: body.lastname,
                    avatarName: req.file ? req.file.filename : null,
                    passHash,
                    salt
                };

                User
                    .create(newUserData)
                    .then(() => res.redirect("/auth/login"))
                    .catch(() => {
                        res.status(500);
                        res.send("Registration failed");
                        res.end();
                    });
            } else {
                res.status(409);
                // TODO error when user registration failed preferably with AJAX
                res.render("user/register", { user });
                res.end();
            }
        });
}

function loginUser(req, res, next) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    passport.authenticate("local", (err, userModel) => {
        if (err) {
            return next(err); // 500 error
        }
        if (!userModel) {
            // TODO error handling when no user preferably with AJAX
            // viewBag.error = info.message;
            return res.render("user/login", { user });
        }
        req.login(userModel, error => {
            if (error) {
                return next(error);
            }
            return res.redirect("/");
        });
    })(req, res, next);
}

function loginUserFacebook(req, res, next) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    passport.authenticate("facebook", (err, userModel) => {
        if (err) {
            return next(err);
        }
        if (!userModel) {
            return res.render("user/login", { user });
        }

        req.login(userModel, error => {
            if (error) {
                return next(error);
            }

            res.redirect("/users/profile");
        });
    })(req, res, next);
}

function loginUserGoogle(req, res, next) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    passport.authenticate("google", { scope: ['profile', 'email'] }, (err, userModel) => {
        if (err) {
            return next(err);
        }
        if (!userModel) {
            return res.render("user/login", { user });
        }

        req.login(userModel, error => {
            if (error) {
                return next(error);
            }

            res.redirect("/users/profile");
        });
    })(req, res, next);
}

function logoutUser(req, res) {
    req.logout();
    res.redirect("/");
}

function loadRegisterPage(req, res) {
    res.render("user/register");
}

function loadLoginPage(req, res) {
    res.render("user/login");
}

module.exports = {
    registerUser,
    loginUser,
    loginUserFacebook,
    loginUserGoogle,
    logoutUser,

    loadRegisterPage,
    loadLoginPage
};
