const readline = require('readline');
const fs = require('fs');

const MongoClient = require('mongodb').MongoClient;
process.env["NODE_CONFIG_DIR"] = "../config/";
const config = require('config');

var dbConfig = config.get('mLab.authConfig');

var url = "mongodb://" + dbConfig.user + ":" + dbConfig.pass + "@" + dbConfig.url;

const rl = readline.createInterface({
  input: fs.createReadStream('./amimesongs.csv'),
  crlfDelay: Infinity
});

var song_json = new Array();


console.log(song_json.length);

rl.on('line', (line) => {
  // console.log(line);
  var result = line.split(',');
  var addData = {
    year: result[0],
    title: result[1],
    singer: result[2]
  }
  pushJson(song_json, addData);
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

    console.log(song_json.length);
    col.insertMany(songs_json, (err, res) => {
      if (err) {
        console.log('DB insertMany Error');
      } else {
        console.log('DB Insert success');
      }
    });

    console.log('Close DB');
    client.close();
  }
});

