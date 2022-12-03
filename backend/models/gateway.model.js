'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Device = require('./device.model');

var GatewaySchema = Schema({
    serial: { type: String, required: true, unique: true},
    name: { type: String, required: true, unique: true},
    ipv4: { type: String, required: true},
    devices: [{
        type: Schema.Types.ObjectId,
        ref: Device,
        required: true,
    }],
    
});



module.exports = mongoose.model('Gateway', GatewaySchema);

