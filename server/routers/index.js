const fs = require('fs');
const path = require('path');

module.exports = (app, config) => {
  const routersFolderPath = path.join(config.rootPath, 'server/routers');

  fs.readdir(routersFolderPath, function (err, files) {
    if (err) {
      throw err;
    }

    files
      .filter(file => file.indexOf('-router') >= 0)
      .forEach(file => require(`${__dirname}/${file}`)(app));
  });
};