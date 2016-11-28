/* globals Promise */

module.exports = function(models) {
    let User = models.User;
    return {
        getUserById(id) {
            return new Promise((resolve, reject) => {
                User
                    .findOne({ _id: id }, (err, user) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(user);
                    });
            });
        },
        getUserByUsername(username) {
            return new Promise((resolve, reject) => {
                User
                    .findOne({ username }, (err, user) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(user);
                    });
            });
        },
        getUsernamesOfUsers() {
            return new Promise((resolve, reject) => {
                User
                    .find()
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

            // User.findOneAndUpdate(query, updateObject, (err, us) => {
            //     .find()
            //         .select("username")
            //         .exec((err, users) => {
            //             if (err) {
            //                 return reject(err);
            //             }

            //             return resolve(users);
            //         });
            // });
        }
    };
};