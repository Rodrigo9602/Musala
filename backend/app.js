'use strict'

// load node's modules for server
var express = require('express');
var bodyParser = require('body-parser');

// execute express
var app = express();

// load routes files
var gatewayRoutes = require('./routes/gateway.routes');

// set middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// set cors
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });

// add route's prefixes
app.use('/gateways', gatewayRoutes);

// export current module
module.exports = app;

