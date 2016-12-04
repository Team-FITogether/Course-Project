"use strict";

const ADMIN = "admin";
const TRAINER = "trainer";

module.exports = {
    setIsAdminUser(req, userValidator) {
        if (req.user) {
            req.user.isAdmin = userValidator.isInRole(req.user, ADMIN);
        }
    },
    setIsTrainerUser(req, userValidator) {
        if (req.user) {
            req.user.isTrainer = userValidator.isInRole(req.user, TRAINER);
        }
    }
};