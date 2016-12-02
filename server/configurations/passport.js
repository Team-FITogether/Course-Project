"use strict";

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const configAuth = require("./auth");

module.exports = ({app, data}) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy({
        usernameField: "username",
        passwordField: "password"
    }, (username, password, done) => {
        data.getUserByUsername(username)
            .then(user => {
                if (!user) {
                    done(null, false, { message: "Incorrect credentials." });
                } else if (!user.isValidPassword(password)) {
                    done(null, false, { message: "Incorrect credentials." });
                } else {
                    return done(null, user);
                }
            })
            .catch(err => {
                return done(err);
            });
    }));

    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL
    }, (token, refreshToken, profile, done) => {
        process.nextTick(() => {
            data.findUserByQuery({ facebookId: profile.id })
                .then(user => {
                    if (user) {
                        return done(null, user);
                    } else {
                        let newUser = {
                            username: profile.displayName + configAuth.facebookAuth.usernameSuffix,
                            firstname: profile.name.givenName || profile.displayName,
                            lastname: profile.name.familyName || profile.displayName,
                            passHash: profile.displayName,
                            salt: profile.id,
                            facebookId: profile.id,
                            facebookToken: token
                        };

                        data.createUser(newUser)
                            .then(createdUser => {
                                done(null, createdUser);
                            })
                            .catch(err => {
                                return done(err);
                            });
                    }
                })
                .catch(err => {
                    return done(err);
                });
        });
    }));

    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL
    }, (token, refreshToken, profile, done) => {
        process.nextTick(() => {
            data.findUserByQuery({ googleId: profile.id })
                .then(user => {
                    if (user) {
                        return done(null, user);
                    } else {
                        let newUser = {
                            username: profile.displayName + configAuth.googleAuth.usernameSuffix,
                            firstname: profile.name.givenName || profile.displayName,
                            lastname: profile.name.familyName || profile.displayName,
                            passHash: profile.displayName,
                            salt: profile.id,
                            googleId: profile.id,
                            googleToken: token
                        };

                        data.createUser(newUser)
                            .then(createdUser => {
                                done(null, createdUser);
                            })
                            .catch(err => {
                                return done(err);
                            });

                    }
                })
                .catch(err => {
                    return done(err);
                });
        });
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        data.getUserById(id)
            .then((user) => {
                done(null, user);
            })
            .catch(err => {
                done(err, null);
            });

    });
};
