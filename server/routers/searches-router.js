const controllers = require("../controllers");

module.exports = app => {
    app.get("/search", controllers.searches.findEntities);
};