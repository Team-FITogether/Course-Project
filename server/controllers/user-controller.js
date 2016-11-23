"use strict";

const pug = require("pug");
const passport = require("passport");
const path = require("path");
const config = require("../configurations");
const mongoose = require("mongoose");
const User = mongoose.model("user");
const encryption = require("../utils/encryption");
const viewBagUtil = require("./../utils/view-bag");
const Article = require("./../models/article");

function loadRegisterPage(req, res) {
    let viewBag = viewBagUtil.getViewBag(req);
    res.render("user/register", { viewBag });
}

function loadLoginPage(req, res) {
    let pathToReadFrom = path.join(config.rootPath, "server/views/user/login.pug");
    let viewBag = viewBagUtil.getViewBag(req);
    let compiledFile = pug.compileFile(pathToReadFrom);
    let html = compiledFile({ viewBag });
    res.send(html);
}

function getAllUsers(req, res) {
    User.where().select("username").exec((err, users) => {
        res.json(JSON.stringify(users));
    });
}

function loadAdminPannel(req, res) {
    let viewBag = viewBagUtil.getViewBag(req);
    User.where().select("username").exec((err, data) => {
        var users = data.map((u) => { return u.username });
        //console.log(users);
        res.render("admin-area/admin-pannel", { viewBag, users });
    });
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
                let viewBag = viewBagUtil.getViewBag(req);
                viewBag.error = "User already exists";
                res.render("user/register", { viewBag });
                res.end();
            }
        });
}

function loginUser(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err); // 500 error
        }
        if (!user) {
            let viewBag = viewBagUtil.getViewBag(req);
            viewBag.error = info.message;
            return res.render("user/login", { viewBag });
        }
        req.login(user, err => {
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
    let viewBag = viewBagUtil.getViewBag(req);

    let body = req.body;
    let query = { username: body.username };
    User.findOneAndUpdate(query, { $push: { "roles": body.role } },
        (err, us) => {
            if (!us) {
                viewBag.error = `No user named ${body.username} was found.`;
                return res.render("admin-area/admin-pannel", { viewBag })
            }

            if (err) {
                viewBag.error = err;
                console.log(err, us)
                res.render("admin-area/admin-pannel", { viewBag })
            } else {
                viewBag.successMessage = `Role ${body.role} was succesfully set to user ${us.username}.`
                console.log("success")
                res.render("admin-area/admin-pannel", { viewBag })
            }
        });
}

function loadProfilePage(req, res) {
    let viewBag = viewBagUtil.getViewBag(req);
    let author = req.user.username;
    Article.find({ author })
        .then(articles => {
            res.render("user/profile", {
                avatarName: req.user.avatarName,
                username: req.user.username,
                viewBag,
                articles
            });
        });
}

function loadFoundUserProfilePage(req, res) {
    User
        .findById(req.params.id)
        .then(user => {
            res.render("user/found-user-profile", {
                user,
                currentUser: req.user,
                viewBag: viewBagUtil.getViewBag(req)
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