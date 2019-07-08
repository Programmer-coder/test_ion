const es = require('event-stream');
const fs = require('fs');
const JSONStream = require('JSONStream');

const config = require('../config/config');

const MongoClient = require('mongodb').MongoClient;

const getMongoClient = async () => {
  const client = new MongoClient((config.db.url + ':' + config.db.port), { useNewUrlParser: true });

  return await client.connect();
}

const getCollection = async (args) => {
  const client = await getMongoClient();

  const db = await client.db(config.db.dbName);

  return await db.collection(args.fileName);
}

const updateMongo = async (args, done) => {
  const client = await getMongoClient();

  const db = await client.db(config.db.dbName);

  const coll = await db.collection(args.fileName);

  let data = fs.createReadStream('./files/' + args.fileName);

  /* await */ data
    .pipe(JSONStream.parse('*'))
    .pipe(es.map(function (doc, next) {
      coll.insertOne(doc, next);
    }))

  done();

  // client.close();
}

const getThermometerList = async (done) => {
  const client = await getMongoClient();

  const db = await client.db(config.db.dbName);

  const collections = await db.listCollections().toArray();

  done(null, collections);

  return client.close();
}

/**
 *
 * @param {Object}   args
 * @prop  {String}   args.ts
 * @prop  {String}   args.collectionName
 * @param {Function} done
 */
const getTemperatureData = async (args, done) => {
  const ts = args.ts;
  const collectionName = args.collectionName;

  const collection = await getCollection({ fileName: collectionName });

  const data = await collection.find(ts ? { ts: { $gt: ts } } : undefined).limit(10).toArray();

  done(null, data);

  // return client.close();
}

module.exports = {
  updateMongo,
  getThermometerList,
  getTemperatureData
};