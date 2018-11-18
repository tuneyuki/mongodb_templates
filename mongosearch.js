'use strict';

const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const assert = require('assert');


var dbConfig = config.get('mLab.authConfig');

var url = "mongodb://" + dbConfig.user + ":" + dbConfig.pass + "@" + dbConfig.url;


MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
  assert.equal(null, err);
  console.log('Successfully Connected to MongoDB');

  const db = client.db(dbConfig.dbName);
  const col = db.collection(dbConfig.collection);

  var word = '戦士';
  col.find(
    { $or:[
      {anime: new RegExp(".*" + word + ".*" , "i")},
      {title: new RegExp(".*" + word + ".*" , "i")},
    ]
  }).toArray((err, docs) => {
    if(err) {
      onerror(err);
    } else {
      console.log(docs);
    }

    client.close();
  });
});