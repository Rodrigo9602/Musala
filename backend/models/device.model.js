'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeviceSchema = Schema({
    uid: Number,
    vendor: String,
    date: Date,
    status: {
        type: String,
        enum : ['Offline','Online'],
        default: 'Offline',
    },
});



module.exports = mongoose.model('Device', DeviceSchema);