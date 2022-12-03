'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;
let url = 'mongodb://localhost:27017/apiRest-Gateways';

mongoose.Promise = global.Promise;
mongoose.connect(url,{useNewUrlParser:true}).then(()=>{    
    console.log('Succefully connected to Gateways database');
    app.listen(port,()=>{
        console.log('Server running at http://localhost:3900');
    });
});