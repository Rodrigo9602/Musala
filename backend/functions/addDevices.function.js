'use strict'
let saveDevices = require('./saveDevices.function');
let Gateway = require('../models/gateway.model');

const add = async(serialNumber , device)=>{
    let devices = [];
    let newDevices = [];
    let gateway = new Gateway();
    

    try{
        gateway = await Gateway.find({serial: serialNumber});
    } catch(err){
        return err.message || 'Access error';
    }
    
    devices = await saveDevices(device);    
    newDevices = gateway[0].devices.push(devices[0]._id);
    
    console.log(gateway[0].devices);
    return gateway[0].devices;


    
}

module.exports = add;