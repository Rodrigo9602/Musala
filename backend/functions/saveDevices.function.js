'use strict'

var validator = require('validator');
var Device = require('../models/device.model');
var getUID = require('./create_uid.function');

const saveDevices =  async (devices) => {
    
    
    let createdDevices = [];
    
        // validate data
        for (var i=0; i< devices.length; i++){
            try{
            var vendorValidate = !validator.isEmpty(devices[i].vendor);
            var statusValidate = !validator.isEmpty(devices[i].status);
            } catch(error){
                return [error.message];
            }
            if(vendorValidate && statusValidate){       
                let device = new Device();              
                device.uid =   getUID();
                device.vendor = devices[i].vendor;
                device.date = new Date();
                device.status = devices[i].status;  
                
                
                
                // save the newDevice on device database   
                
                createdDevices.push(await device.save());
                      
            }else{
                return ['Missing data'];
            }          
        }
       
    return createdDevices;
}

module.exports = saveDevices;