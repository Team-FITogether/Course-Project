"use strict";

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const configAuth = require("./auth");
const User = mongoose.model("user");

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: "username",
        passwordField: "password"
    }, (username, password, done) => {
        User.findOne({ username }, (err, user) => {
            if (err) {
                return done(err);
            } else if (!user) {
                done(null, false, { message: "Incorrect credentials." });
            } else if (!user.isValidPassword(password)) {
                done(null, false, { message: "Incorrect credentials." });
            } else {
                return done(null, user);
            }
        });
    }));

    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL
    }, (token, refreshToken, profile, done) => {
        process.nextTick(() => {
            User.findOne({ facebookId: profile.id }, (err, user) => {
                if (err) {
                    return done(err);
                } else if (user) {
                    return done(null, user);
                } else {
                    let newUser = new User({
                        username: profile.displayName,
                        firstname: profile.name.givenName || profile.displayName,
                        lastname: profile.name.familyName|| profile.displayName,
                        passHash: profile.displayName,
                        salt: profile.id,
                        facebookId: profile.id,
                        facebookToken: token
                    });

                    newUser.save((err) => {
                        if (err) {
                            return done(err);
                        }
                        return done(null, newUser);
                    });
                }
            });
        });
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};
