'use strict';

var compress = require('compression');
var ejs = require('ejs');
var express = require('express');
var fs = require('fs');
var morgan = require('morgan');
var request = require('request');

var app = express();
var vehicles = [];

app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

app.use(compress());
app.use(morgan('dev'));
app.use('/static', express.static(__dirname + '/static'));

app.get('/api/vehicles', function(req, res) {
  if (vehicles.length) return res.json(vehicles);
  request('http://showroom.broker.is/api/items', function(err, response, body) {
    vehicles = JSON.parse(body.replace(")]}',", ''));
    res.send(vehicles);
  });
});
app.get('/*', function(req, res) {
  res.render('base.html', {
    env: app.get('env')
  });
});

app.listen(8888);
