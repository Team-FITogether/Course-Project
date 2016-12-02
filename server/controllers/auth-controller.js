"use strict";

const USER_LOGIN_VIEW = "user/login";
const USER_REGIESTER_VIEW = "user/register";

function createUserInDatabase(req, res, encryptionProvider, data, htmlEscaper) {
    let username = htmlEscaper.escapeTags(req.body.username);
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let salt = encryptionProvider.getSalt();
    let passHash = encryptionProvider.getPassHash(salt, req.body.password);
    let avatarName = req.file ? req.file.filename : null;

    data.createUser({ username, firstname, lastname, passHash, salt, avatarName })
        .then(() => res.json("{\"success\":\"Успешна регистрация!\"}"))
        .catch(() => {
            res.json("{\"error\":\"Регистрацията се провали.\"}");
            res.status(500);
            res.end();
        });
}

function localAuthentication(req, res) {
    return (err, userModel) => {
        if (err) {
            return err;
        }

        if (!userModel) {
            return res.json("{\"error\": \"Невалидни, потеребителско име или парола.\"}");
        }

        req.login(userModel, error => {
            if (error) {
                console.log(error);
                return res.json("{\"error\": \"Невалидни, потеребителско име или парола.\"}");
            }

            return res.json(`{"success": "Успешен вход, здравейте ${userModel.username}!"}`);
        });
    };
}

function loginUser(req, res, next, userModel) {
    req.login(userModel, error => {
        if (error) {
            return next(error);
        }

        res.redirect("/users/profile");
    });
}

function facebookAuthentication(req, res, next) {
    return (err, userModel) => {
        if (err) {
            return next(err);
        }

        if (!userModel) {
            return res.render(USER_LOGIN_VIEW, { user: req.user });
        }

        loginUser(req, res, next, userModel);
    };
}

function googleAuthentication(req, res, next) {
    return (err, userModel) => {
        if (err) {
            return next(err);
        }

        if (!userModel) {
            return res.render(USER_LOGIN_VIEW, { user: req.user });
        }

        loginUser(req, res, next, userModel);
    };
}

module.exports = ({ userValidator, passport, encryptionProvider, common, data, htmlEscaper }) => {
    return {
        registerUser(req, res) {
            common.setIsAdminUser(req, userValidator);
            data.getUserByUsername(req.body.username)
                .then(foundUser => {
                    if (!foundUser) {
                        createUserInDatabase(req, res, encryptionProvider, data, htmlEscaper);
                    } else {
                        res.json("{\"error\":\"Потребителя вече съществува\"}");
                        res.status(409);
                        res.end();
                    }
                });
        },
        loginUser(req, res, next) {
            common.setIsAdminUser(req, userValidator);
            passport.authenticate("local", localAuthentication(req, res))(req, res, next);
        },
        loginUserFacebook(req, res, next) {
            common.setIsAdminUser(req, userValidator);
            passport.authenticate("facebook", facebookAuthentication(req, res, next))(req, res, next);
        },
        loginUserGoogle(req, res, next) {
            common.setIsAdminUser(req, userValidator);
            passport.authenticate("google", { scope: ["profile", "email"] }, googleAuthentication(req, res, next))(req, res, next);
        },
        logoutUser(req, res) {
            req.logout();
            res.redirect("/");
        },
        loadRegisterPage(req, res) {
            res.render(USER_REGIESTER_VIEW);
        },
        loadLoginPage(req, res) {
            res.render(USER_LOGIN_VIEW);
        }
    };
};