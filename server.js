#!/usr/bin/env node

var express = require('express'),
  fs = require('fs'),
  completecdnfinder = require("./lib/cdnfinder.js").completecdnfinder,
  hostnamefinder = require("./lib/hostnamefinder.js").hostnamefinder;




var app = express.createServer();
app.use(express.bodyParser());
app.post('/', function(req, res){
  console.log(new Date(), req.connection.remoteAddress)
  console.log(new Date(), req.body.url)
  completecdnfinder(req.body.url, function(err, results){
    if(results){
      res.send(results);
    } else {
      res.send({"status": "FAILURE"});
    }
  });
});


app.post('/hostname/', function(req, res){
  console.log(new Date(), req.connection.remoteAddress)
  console.log(new Date(), req.body.hostname);
  hostnamefinder(req.body.hostname, function(response){
    res.send(response);
  })
});


app.get('/', function(req, res){
  console.log(new Date(), req.connection.remoteAddress)
  fs.readFile(__dirname + '/cdnfinder.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading cdnfinder.html');
    }
    res.writeHead(200);
    res.end(data);
  });
});


app.listen(1337);

//completecdnfinder("http://www.msnbc.com/", function(err, results){
//  console.dir(results);
//});
