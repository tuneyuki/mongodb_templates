const readline = require('readline');
const fs = require('fs');

const MongoClient = require('mongodb').MongoClient;
process.env["NODE_CONFIG_DIR"] = "../config/";
const config = require('config');

var dbConfig = config.get('mLab.authConfig');

var url = "mongodb://" + dbConfig.user + ":" + dbConfig.pass + "@" + dbConfig.url;
var array = [];

const rl = readline.createInterface({
  input: fs.createReadStream('./amimesongs.csv'),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  // console.log(line);
  var result = line.split(',');
  var addData = {
    year: result[0],
    title: result[1],
    singer: result[2],
    anime: result[3]
  }
  array.push(JSON.stringify(addData));
});

pushJson = (json, addData) => {
  json.push(addData);
  return;
}

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
  if(err) {
    console.log(err);
  } else {
    console.log('Successfully connected to MongoDB');

    var db = client.db(dbConfig.dbName);
    var col = db.collection(dbConfig.collection);

    console.log(array.length);
    
    array.forEach((data) => {
      col.insertOne(JSON.parse(data), (err, result) => {
        if(err){
          console.log(err);
        } else {
          console.log('InsertOne Success!');
        }
      });
    });

    console.log('Close DB');
    client.close();
  }
});

