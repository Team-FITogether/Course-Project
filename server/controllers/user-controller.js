"use strict";

const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("user");
const encryption = require("../utils/encryption");
const Article = require("./../models/article");

function loadRegisterPage(req, res) {
    res.render("user/register");
}

function loadLoginPage(req, res) {
    res.render("user/login");
}

function getAllUsers(req, res) {
    User
        .where()
        .select("username")
        .exec((err, users) => {
            res.json(JSON.stringify(users));
        });
}

function loadAdminPannel(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    User
        .where()
        .select("username")
        .exec((err, data) => {
            let users = data.map(u => u.username);
            res.render("admin-area/admin-pannel", { user, users });
        });
}

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

    passport.authenticate("local", (err, userModel, info) => {
        if (err) {
            return next(err); // 500 error
        }
        if (!userModel) {
            // TODO error handling when no user preferably with AJAX
            //viewBag.error = info.message;
            return res.render("user/login", { user });
        }
        req.login(userModel, err => {
            if (err) {
                return next(err); // black magic
            }
            return res.redirect("/");
        });
    })(req, res, next);
}

function logoutUser(req, res) {
    req.logout();
    res.redirect("/");
}

function addRole(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    let body = req.body;
    let query = { username: body.username };
    User
        .findOneAndUpdate(query, {
            $push: {
                "roles": body.role
            }
        },
        (err, us) => {
            if (!us) {
                //TODO error handlig preferably with AJAX
                //viewBag.error = `No user named ${body.username} was found.`;
                return res.render("admin-area/admin-pannel", { user });
            }

            if (err) {
                //TODO error handlig preferably with AJAX
                //viewBag.error = err;
                console.log(err, us);
                res.render("admin-area/admin-pannel", { user });
            } else {
                //TODO error handlig preferably with AJAX
                //viewBag.successMessage = `Role ${body.role} was succesfully set to user ${us.username}.`;
                console.log("success");
                res.render("admin-area/admin-pannel", { user });
            }
        });
}

function loadProfilePage(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
        user.isTrainer = req.user.roles.indexOf("trainer") !== -1;
    }

    let author = req.user.username;
    Article.find({ author })
        .then(articles => {
            res.render("user/profile", {
                user,
                articles
            });
        });
}

function loadFoundUserProfilePage(req, res) {
    let user = req.user;
    if (req.user) {
        user.isAdmin = req.user.roles.indexOf("admin") !== -1;
    }

    User
        .findById(req.query.id)
        .then(foundUser => {
            console.log(req.query.id);
            res.render("user/found-user-profile", {
                foundUser,
                user
            });
        })
        .catch(console.log);
}

module.exports = {
    loadRegisterPage,
    loadLoginPage,
    loadAdminPannel,
    loadProfilePage,
    loadFoundUserProfilePage,

    getAllUsers,

    registerUser,
    loginUser,
    logoutUser,
    addRole
};