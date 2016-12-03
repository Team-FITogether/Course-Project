/* globals Promise */

module.exports = function(models) {
    let { User } = models;

    return {
        getUserById(id) {
            return new Promise((resolve, reject) => {
                User.findOne({ "_id": id }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getUserByUsername(username) {
            return new Promise((resolve, reject) => {
                User.findOne({ username }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getUsernamesOfUsers() {
            return new Promise((resolve, reject) => {
                User.find()
                    .select("username")
                    .exec((err, users) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(users);
                    });
            });
        },
        findUserAndUpdate(options, userToUpdate) {
            return new Promise((resolve, reject) => {

                User.findOneAndUpdate(options, userToUpdate, (err, foundUser) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(foundUser);
                });
            });
        },
        createUser({ username, firstname, lastname, passHash, salt, facebookId, facebookToken, googleId, googleToken, avatarName }) {
            let user = new User({
                username,
                firstname,
                lastname,
                passHash,
                salt,
                facebookId,
                facebookToken,
                googleId,
                googleToken,
                avatarName
            });

            return new Promise((resolve, reject) => {
                User.create(user, (err, createdUser) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(createdUser);
                });
            });
        },
        findUserByQuery(query) {
            return new Promise((resolve, reject) => {
                User.findOne(query, (err, user) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(user);
                });
            });
        },
        findUserByQueryWithSelectIdAndName(query) {
            return new Promise((resolve, reject) => {
                User.find(query)
                    .select("_id username avatarName")
                    .exec((err, users) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(users);
                    });
            });
        },
        updateWorkoutsCalendar(user, workout) {
            return new Promise(resolve => {
                user.calendar.workouts.push(workout);
                user.save();
                return resolve(user);
            });
        },
        updateMenusCalendar(user, menu) {
            return new Promise(resolve => {
                user.calendar.menus.push(menu);
                user.save();
                return resolve(user);
            });
        }
    };
};