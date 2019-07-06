const fs = require('fs');

const mongo = require('../store/mongo');
const config = require('../config/config');

const home = (req, res) => {
  return res.status(200)
    .set('Content-Type', 'text/html')
    .send(config.templates.index)
}

const serveUploadPage = (req, res) => {
  return res
    .status(200)
    .set('Content-Type', 'text/html')
    .send(config.templates.upload)
}

const uploadChunk = (req, res) => {
  const headers = req.headers;

  const fileName = headers['x-filename'];

  req.pipe(fs.createWriteStream('./files/' + fileName, { flags: 'a' }));

  return res.status(200).send();
}

const finalizeFileUpload = (req, res) => {
  const body = req.body;

  const fileName = body.fileName;

  mongo.updateMongo({ fileName }, () => {
    // delete source file
    return fs.unlink('./files/' + fileName, () => {
      return res.send({ success: true });
    });
  });
}

const getThermometerList = (req, res) => mongo.getThermometerList((err, data) => {
  if (err) {
    return res.status(500).send({ success: false, error: err });
  }

  return res.send({ collections: data.map(coll => coll.name) });
})

const serveGraphPage = (req, res) => {
  return res
    .status(200)
    .set('Content-Type', 'text/html')
    .send(config.templates.graph);
}

const getTemperatureData = (req, res) => {
  var body = req.body;

  return mongo.getTemperatureData({
    ts: body.ts,
    collectionName: req.params.collection,
  }, (err, data) => {
    if (err) {
      return res.status(500).send({ success: false, error: err });
    }

    return res.status(200).send({ success: true, data, thermometer: req.params.collection });
  });
}

const refreshUploadTemplate = (req, res) => {
  return res.status(400).send({ success: false, error: 'Not yet Supported.'})
}

module.exports = {
  home,
  serveUploadPage,
  uploadChunk,
  finalizeFileUpload,
  getThermometerList,
  serveGraphPage,
  getTemperatureData,

  refreshUploadTemplate
};