const fs = require('fs');
const express = require('express');
const parallel = require('async').parallel;

const config = require('./config');

require('dotenv').config();

const app = express();

require('../routes/routes')(app);

const init = () => {
  const templateKeys = Object.keys(config.static.templates);

  parallel(
    templateKeys.map(
      templateName => callback => fs.readFile(config.static.templates[templateName], callback)
    ),
    (err, results) => {
      if (err) {
        console.log('Error starting app: ', err);

        throw JSON.stringify(err);
      }

      results.forEach((result, i) => {
        config.templates[templateKeys[i]] = result.toString();
      })
    }
  )

  console.log('Server Started at Port# ', config.app.port);
}


module.exports = {
  start: () => app.listen(config.app.port, init)
}