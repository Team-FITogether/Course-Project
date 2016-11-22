const mongoose = require("mongoose");

function findUsers(username, isLoggedIn, res) {
    mongoose
        .model("user")
        .where({ username })
        .select('_id username')
        .exec((err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.render("searches/found-users.pug", {
                    users: data,
                    viewBag: {
                        isLoggedIn
                    }
                });
            }
        });
}

function findEntities(req, res) {
    let query = req.query;
    let entityName = query.entityName;
    let isLoggedIn = !!req.user;

    if (entityName === "users") {
        findUsers(query.searchValue, isLoggedIn, res);
    }
}

module.exports = {
    findEntities
};