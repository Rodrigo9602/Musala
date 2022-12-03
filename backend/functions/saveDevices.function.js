'use strict'

var validator = require('validator');
var Device = require('../models/device.model');
var getUID = require('../functions/create_uid.fcn');

const saveDevices =  async (devices) => {
    
    
    let createdDevices = [];
    
        // validate data
        for (var i=0; i< devices.length; i++){
            try{
            var vendorValidate = !validator.isEmpty(devices[i].vendor);
            var statusValidate = !validator.isEmpty(devices[i].status);
            } catch(error){
                return error.message || 'Validation error';
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
                return 'Missing data from device '+(i+1);
            }          
        }
       
    return createdDevices;
}

module.exports = saveDevices;