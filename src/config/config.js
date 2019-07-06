const path = require('path');

module.exports = {
  app: {
    port: process.env.PORT || 3000,
  },
  db: {
    url: process.env.MONGO_URL || 'mongodb://localhost',
    port: process.env.MONGO_PORT || 27017,
    dbName: process.env.DB_NAME || 'ion'
  },
  static: {
    templates: {
      index: path.join(__dirname + '/../' + '/static/home.html'),
      graph: path.join(__dirname + '/../' + '/static/graph.html'),
      upload: path.join(__dirname + '/../' + '/static/upload.html'),
    },
  },
  templates: { },
};