const fs = require('fs');
const path = require('path');
const es = require('event-stream');
const JSONStream = require('JSONStream');
const MongoClient = require('mongodb').MongoClient;

const UPLOAD_TEMPLATE = fs.readFileSync(path.join(__dirname + '/static/upload.html'));

const DB_NAME = 'iot';
const MONGO_URL = 'mongodb://localhost:27017/' + DB_NAME;

const getMongoClient = async () => {
  const client = new MongoClient(MONGO_URL, { useNewUrlParser: true });

  return await client.connect();
}

const updateMongo = async (args) => {
  const client = await getMongoClient();

  const db = await client.db(DB_NAME);

  const coll = await db.collection(args.fileName);

  let data = fs.createReadStream('./files/' + args.fileName);

  data
    .pipe(JSONStream.parse('*'))
    .pipe(es.map(function (doc, next) {
      coll.insertOne(doc, next);
    }))

  client.close();
}

const getCollection = async (args) => {
  const client = await getMongoClient();

  const db = await client.db(DB_NAME);

  return await db.collection(args.fileName);
}

const finalizeFileUpload = (req, res) => {
  const body = req.body;

  const fileName = body.fileName;

  updateMongo({ fileName });

  return res.send({ success: true });
}

const uploadChunk = async (req, res) => {
  const headers = req.headers;

  const fileName = headers['x-filename'];
  // const fileSize = headers['x-filesize'];
  // const chunkCount = headers['x-chunkcount'];
  // const collection = await getCollection({ fileName });

  req.pipe(fs.createWriteStream('./files/' + fileName, { flags: 'a' }));

  res.status(200).send();
}

const getHomePage = (req, res) => {
  return res.status(200)
    .set('Content-Type', 'text/html')
    .sendFile(path.join(__dirname + '/static/home.html'));
};

const serveUploadPage = (req, res) => {
  return res
    .status(200)
    .set('Content-Type', 'text/html')
    .send(UPLOAD_TEMPLATE)
}

const refreshUploadTemplate = (req, res) => {
  UPLOAD_TEMPLATE = fs.readFileSync(path.join(__dirname + '/static/upload.html'));

  return res.send('success');
}

const serveGraphPage = (req, res) => {
  return res
    .status(200)
    .set('Content-Type', 'text/html')
    .send(fs.readFileSync(path.join(__dirname + '/static/graph.html')));
}

const getTemperatureData = async (req, res) => {
  var body = req.body;

  const collection = await getCollection({ fileName: req.params.collection });

  const data = await collection.find(body.ts ? { ts: { $gt: body.ts } } : undefined).limit(10).toArray();

  return res.send({ success: true, data, thermometer: req.params.collection });
}

const getThermometerList = async (req, res) => {
  const client = await getMongoClient();

  const db = await client.db(DB_NAME);

  const collections = await db.listCollections().toArray();

  client.close();

  return res.send({ collections: collections.map(coll => coll.name) });
}

module.exports = {
  uploadChunk,
  getHomePage,
  serveGraphPage,
  serveUploadPage,
  getTemperatureData,
  refreshUploadTemplate,
  finalizeFileUpload,
  getThermometerList
};