'use strict';

const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const assert = require('assert');


var dbConfig = config.get('mLab.authConfig');

var url = "mongodb://" + dbConfig.user + ":" + dbConfig.pass + "@" + dbConfig.url;

// Use connect method to connect to the server
MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  
  const db = client.db(dbConfig.dbname);
  const col = db.collection(dbConfig.collection);
  
  col.find({}).toArray((err, docs) => {
    if(err) {
      onError(err);
    } else {
      console.log(docs);
    }
  });

  client.close();
});


const onError = (err) => {
  console.log("エラーが起きました!");
  console.log(err.stack);
}

// Promiseを利用したパターン
// MongoClient.connect(url, {useNewUrlParser: true})
// .then((client) => {
//   console.log("Successfully connected to DB");

//   const db = client.db(dbConfig.dbname);
//   const col = db.collection(dbConfig.collection);

//   col.find({}).toArray()
//     .then((docs) => {
//       console.log(docs);
//     });

//   client.close();
// })
// .catch ((err) => {
//   console.log("エラー箇所2");
//   onError(err);
// });


