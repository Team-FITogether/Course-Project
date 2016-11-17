const path = require('path');

const rootPath = path.join(__dirname, '/../../');

module.exports = {
  db: 'mongodb://localhost:27017/FiTogether',
  port: 8080,
  rootPath
};