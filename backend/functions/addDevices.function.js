'use strict'
let saveDevices = require('./saveDevices.function');
let Gateway = require('../models/gateway.model');

const add = async (serialNumber, device) => {
    let devices = [];
    let newDevices = [];
    let gateway = new Gateway();


    try {
        gateway = await Gateway.find({ serial: serialNumber });
    } catch (err) {
        return ['Access error'];
    }
    if (gateway.length == 0) {
        return gateway;
    }
    
    else {
        console.log(gateway[0].devices.length);
        if (gateway[0].devices.length== 10) {
            return ['Limit of devices reached'];
        }
        else {
            devices = await saveDevices(device);
            newDevices = gateway[0].devices.push(devices[0]._id);

            return gateway[0].devices;
        }
    }

}

module.exports = add;