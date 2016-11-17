const fs = require('fs');
const path = require('path');
const controllers = require('../controllers');

module.exports = (app, config, userValidator) => {
  app.get('/', controllers.home.loadHomePage);

  const routersFolderPath = path.join(config.rootPath, 'server/routers');

  fs.readdir(routersFolderPath, function (err, files) {
    if (err) {
      throw err;
    }

    files
      .filter(file => file.indexOf('-router') >= 0)
      .forEach(file => require(`${__dirname}/${file}`)(app, userValidator));
  });
};