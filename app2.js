var express = require('express');
var path = require('path');
var app = express();
const mongo = require('mongodb');
const config = require('config');

app.set('views', path.join(__dirname, ''));
app.set('view engine', 'pug');


var dbConfig = config.get('mLab.authConfig');

const url = "mongodb://" + dbConfig.user + ":" + dbConfig.pass + "@" + dbConfig.url;
var client = mongo.connect(url, {useNewUrlParser: true});
console.log(client);

app.get('/', (req, res) => {
  client.then((client) => {
    client.db(dbConfig.dbname).collection('songs').find({}, {limit: 20}).toArray((err, result) => {
      // console.log(result);
      res.render('index', {data: result});
    });
  });
});

app.get('/:year', (req, res) => {
  console.log(req.params.year);
  var param = req.params.year + '年';
  client.then((client) => {
    client.db(dbConfig.dbname).collection('songs').findOne({year: param}, (err, result) => {
      console.log(result);
      res.send(result);
    });  
  });
});

client.catch((err) => {
  console.log('Error Occured');
});


app.listen(3000, () => {
  console.log('Server started. listening 3000');
});