var express = require('express')
  , app = express() // Web framework to handle routing requests
  , cookieParser = require('cookie-parser') // Cookie handler
  , bodyParser = require('body-parser')
  , cons = require('consolidate') // Templating library adapter for Express
  , XLSX = require('xlsx') // Excel library for workbook interaction
  , MongoClient = require('mongodb').MongoClient // Driver for connecting to MongoDB
  , routes = require('./routes') // Routes for our application
  ,	xlsxj = require("xlsx-to-json"); //excel to json converter

MongoClient.connect('mongodb://localhost:27017/MapCreator', function(err, db) {
    "use strict";
    if(err) throw err;

    // Register our templating engine
    app.engine('html', cons.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');

    // Express middleware to populate 'req.cookies' so we can access cookies
    app.use(cookieParser());

    // Express middleware to populate 'req.body' so we can access POST variables
    app.use(bodyParser());

    // Application routes
    routes(app, db);

    app.listen(3000);
    console.log('Express server listening on port 3000');


  xlsxj({
    input: "RTAC Config Input.xlsx", 
    output: "RTAC Config Input.json"
  }, function(err, result) {
    if(err) {
      console.error(err);
    }else {
      console.log(result);
    }
  });
});
