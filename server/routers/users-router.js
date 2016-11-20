"use strict";

const controllers = require("../controllers");
const passport = require("passport");
const multer = require("multer");

module.exports = (app, userValidator) => {
    const upload = multer({ dest: "./public/img/user-images" });

    app.get("/users/register", controllers.user.loadRegisterPage);
    app.get("/users/login", controllers.user.loadLoginPage);
    app.get("/users/profile/:userId", userValidator.isUserLoggedIn, controllers.user.loadProfilePage);
    app.get("/admin-pannel", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, controllers.user.loadAdminPannel)
    app.get("/logout", userValidator.isUserLoggedIn, (req, res) => {
        req.logout();
        res.redirect("/");
    });

    app.post("/users/register", upload.single("avatar"), controllers.user.registerUser);
    app.post("/users/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    }));
    app.post("/users/set-role", userValidator.isAdminUserMiddleware, userValidator.isUserLoggedIn, controllers.user.addRole);
};