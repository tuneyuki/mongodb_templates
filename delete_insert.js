'use strict';

const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const assert = require('assert');


var dbConfig = config.get('mLab.authConfig');

var url = "mongodb://" + dbConfig.user + ":" + dbConfig.pass + "@" + dbConfig.url;

MongoClient.connect(url, {useNewUrlParser: true})
  .then((client) => {
    console.log('Successfully connected to MongoDB');
    const db = client.db(dbConfig.dbName);
    const col = db.collection(dbConfig.collection);

    var addData;

    col.findOne({year: '1996年'})
      .then((result) => {
        console.log(result);

        addData = {
          year: result.year,
          title: result.title,
          singer: result.singer,
          anime: result.anime
        };

        return col.deleteOne(result);
      })
      .then((result) => {
        console.log(result);

        return  col.insertOne(addData);
      })
      .then((result) => {
        console.log(result);

        return col.findOne({year: '1996年'});
      })
      .then((result) => {
        console.log(result);

        client.close();
      });
  })
  .catch((err) => {
    onError(err);
  });

// MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
//   assert.equal(null, err);
//   console.log('Successfully connected to MongoDB');

//   const db = client.db(dbConfig.dbName);
//   const col = db.collection(dbConfig.collection);

//   // データを1個抽出する
//   col.findOne({year: '1995年'}, (err, result) => {
//     if(err) {
//       onError(err);
//     } else {
//       // console.log(result);

//       var addData = {
//         year: result.year,
//         title: result.title,
//         singer: result.singer,
//         anime: result.anime
//       };

//       console.log(addData);

//       col.deleteOne(addData, (err, result) => {
//         if(err){
//           onError(err);
//         } else {
//           col.insertOne(addData, (err, result2) => {
//             if(err){
//               onError(err);
//             } else {
//               console.log(result2);
//             }
//             client.close();
//           });
//         }
//       });
//     }
//   });
  // 抽出したデータをDBから削除する
  // console.log(data);


  // 抽出したデータをDBに再登録する

  // DBをクローズする
  //client.close();
// });


function onError(err) {
  console.log('エラー発生!!!!!');
  console.log(err);
}