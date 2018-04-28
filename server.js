const express = require('express')            
      http = require('http'),
      bodyParser = require('body-parser'),
      compression = require('compression'),
      fs = require('fs'),
      app = express(),
      mongoClient = require('mongodb').MongoClient;      

const dbURL = 'mongodb://172.27.226.6:27017/datanegar';
var dbConnection;
//const dbURL = 'mongodb://localhost:27017/datanegar';

app.use(function (req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, enctype");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app
  .use(express.static(__dirname + '/dist'))
  .use(bodyParser.json({ limit: '10mb', type: 'application/json' }))
  .use(bodyParser.urlencoded({ limit: '10mb', extended: true, type: 'application/x-www-form-urlencoding' }))
  .use(compression())
  
mongoClient.connect(dbURL, (err, db) => {
  if (err) { console.log('Could not Connect to database: ' + err); }
  else { app.db = db;console.log('Connection OK!');}
});

var fileweb = require('./mongo/fileweb');
var groupArticle = require('./mongo/group.article');
var article = require('./mongo/article');

app.use('/fileweb', fileweb);
app.use('/groupArticle', groupArticle);
app.use('/article', article);
//===============================================================
app.get('*', (req, res) => {
  res.sendFile(__dirname, '/index.html');
});
//===============================================================
const port = process.env.PORT || '8626';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));




