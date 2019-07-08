const controller = require('../controller/controller');

const bodyParser = require('body-parser');

module.exports = app => {
  app
    .get('/', controller.home)
    .get('/upload', controller.serveUploadPage)
    .post('/upload/chunk', controller.uploadChunk)
    .post('/upload/complete', bodyParser.json(), controller.finalizeFileUpload)

    .get('/temperature/list', controller.getThermometerList)
    .get('/graph', controller.serveGraphPage)
    .post('/graph/temperature/:collection', bodyParser.json(), controller.getTemperatureData)

    // internals
    // refresh upload template
    .get('/__internals/upload', controller.refreshUploadTemplate)
}