"use strict";

const data = require("./../data/user-data");

const ADMIN = "admin";

function setIsAdminUser(req, userValidator) {
    if (req.user) {
        req.user.isAdmin = userValidator.isInRole(req.user, ADMIN);
    }
}

function createUserInDatabase(req, res, encryptionProvider) {

    let salt = encryptionProvider.getSalt();
    let passHash = encryptionProvider.getPassHash(salt, req.body.password);
    let newUserData = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        avatarName: req.file ? req.file.filename : null,
        passHash,
        salt
    };

    data.createUser(newUserData)
        .then(() => res.json(`{"success":"Успешна регистрация!"}`))
        .catch(() => {
            res.json(`{"error":"Регистрацията се провали."}`);            
            res.status(500);
            res.end();
        });
}

function localAuthentication(req, res) {
    return (err, userModel) => {
        if (err) {
            return (err);
        } else {
            if (!userModel) {
                return res.json(`{"error": "Невалидни, потеребителско име или парола."}`);
            }

            req.login(userModel, error => {
                if (error) {
                    console.log(error);
                    return res.json(`{"error": "Невалидни, потеребителско име или парола."}`);

                } else {
                    return res.json(`{"success": "Успешен вход, здравейте ${userModel.username}!"}`);
                }
            });
        }
    };
}

function facebookAuthentication(req, res, next) {
    return (err, userModel) => {
        if (err) {
            return next(err);
        }

        if (!userModel) {
            return res.render("user/login", { user: req.user });
        }

        req.login(userModel, error => {
            if (error) {
                return next(error);
            }

            res.redirect("/users/profile");
        });
    };
}

function googleAuthentication(req, res, next) {
    return (err, userModel) => {
        if (err) {
            return next(err);
        }

        if (!userModel) {
            return res.render("user/login", { user: req.user });
        }

        req.login(userModel, error => {
            if (error) {
                return next(error);
            }

            res.redirect("/users/profile");
        });
    }
}

module.exports = (userValidator, authenticationProvider, encryptionProvider) => {
    return {
        registerUser(req, res) {
            console.log("register body: ", req.body)
            if (req.user) {
                req.user.isAdmin = userValidator.isInRole(req.user, ADMIN);
            }

            data.getUserByUsername(req.body.username)
                .then(foundUser => {
                    if (!foundUser) {
                        createUserInDatabase(req, res, encryptionProvider);
                    } else {
                        res.json(`{"error":"Потребителя вече съществува"}`)                        
                        res.status(409);
                        res.end();
                    }
                });
        },
        loginUser(req, res, next) {
            console.log("login body: ", req.body)
            setIsAdminUser(req, userValidator);
            authenticationProvider.authenticate("local", localAuthentication(req, res))(req, res, next);
        },
        loginUserFacebook(req, res, next) {
            setIsAdminUser(req, userValidator);
            authenticationProvider.authenticate("facebook", facebookAuthentication(req, res, next))(req, res, next);
        },
        loginUserGoogle(req, res, next) {
            setIsAdminUser(req, userValidator);
            authenticationProvider.authenticate("google", { scope: ["profile", "email"] }, googleAuthentication(req, res, next))(req, res, next);
        },
        logoutUser(req, res) {
            req.logout();
            res.redirect("/");
        },
        loadRegisterPage(req, res) {
            res.render("user/register");
        },
        loadLoginPage(req, res) {
            res.render("user/login");
        }
    };
};