const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const assert = require('assert');


var dbConfig = config.get('mLab.authConfig');

var url = "mongodb://" + dbConfig.user + ":" + dbConfig.pass + "@" + dbConfig.url;

// Use connect method to connect to the server
// MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

  
//   const db = client.db(dbConfig.dbname);
//   const col = db.collection(dbConfig.collection, );
  
//   col.find({}).toArray((err, docs) => {
//     if(err) {
//       console.log("Error");
//     } else {
//       console.log(docs);
//     }
//   });

//   client.close();
// });

MongoClient.connect(url, {useNewUrlParser: true})
  .then((client) => {
    //console.log(client);
    console.log('Connected successfully to server');

    const db = client.db(dbConfig.dbname);
    const col = db.collection(dbConfig.collection);

    col.find({}).toArray((err, docs) => {
      if(err){
        return err;
      } else {
        console.log(docs);
      }
    });
    client.close();
  })
  .catch((err) => {
    onError(err);
  });

const onError = (err) => {

}

// MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {

//   client.close();
// });
//   .then(
//     client => {
//       return client.db(dbConfig.dbname);
//     }
//   )
//   .then(
//     db => {
//       return db.collection(dbConfig.collection);
//     }
//   )
//   .then(
//     col => {
//       col.find({}).toArray((err, docs) => {
//         if(err) {
//           console.log("Error");
//         } else {
//           console.log(docs);
//         }
//       });

//       return client;
//     }
//   )
//   .then(
//     client => {
//       client.close();
//     }
//   )
//   .catch(
//     err => {
//       console.log(err.stack);
//       return ;
//     }
//   );
