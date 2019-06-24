const express = require('express');
const bodyParser = require('body-parser');

const controller = require('./server.controller');

const app = express();

const port = 3000;

app
  .use(express.static('app'))
  .get('/', controller.getHomePage)
  .get('/upload', controller.serveUploadPage)
  .post('/upload/chunk', controller.uploadChunk)
  .post('/upload/complete', bodyParser.json(), controller.finalizeFileUpload)

  //
  .get('/temperature/list', controller.getThermometerList)
  .get('/graph', controller.serveGraphPage)
  .post('/graph/temperature/:collection', bodyParser.json(), controller.getTemperatureData)

  // internals
  // refresh upload template
  .get('/__internals/upload', controller.refreshUploadTemplate)

  .listen(port, () => console.log('Server started at Port# ', port ));