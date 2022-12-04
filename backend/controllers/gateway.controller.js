'use strict'

var validator = require('validator');
var Gateway = require('../models/gateway.model');
var Device = require('../models/device.model');
const { v4: uuidv4 } = require('uuid');
var getUID = require('../functions/create_uid.function');
var saveDevices = require('../functions/saveDevices.function');
var add = require('../functions/addDevices.function');
var del = require('../functions/deleteDevices.function');
const { findOneAndUpdate, findOneAndDelete } = require('../models/device.model');

const controller = {
    save: async (req, res) => {

        // get the gateway object on the body
        var params = req.body;
        var devices = [];
        // check if gateway already exits on database
        Gateway.find({ name: params.name }, async (error, gateway) => {
            if (error) {
                return res.status(500).send({
                    status: 'error',
                    message: 'An error just happen when we try to access gateway db',
                });
            }
            else if (gateway.length != 0) {
                return res.status(400).send({
                    status: 'error',
                    message: 'Gateway already exits on database',
                });
            }
            // validate gateway data
            try {
                var nameValidate = !validator.isEmpty(params.name);
                var ipv4 = !validator.isEmpty(params.ipv4) && validator.isIP(params.ipv4, 4);
            } catch (error) {
                return res.status(500).send({
                    status: 'error',
                    message: error.message || 'Validation error',
                });
            }
            if (nameValidate && ipv4) {
                // create an gateway object
                var gateway = new Gateway();

                // set the values for every field of the object
                gateway.serial = uuidv4();
                gateway.name = params.name;
                gateway.ipv4 = params.ipv4;


                // save the object
                try {
                    // if it doesnt exits save the devices arrays on device db and get an array of _id for each element related to current gateway
                    devices = await saveDevices(params.devices);
                    if (devices[0] === 'Missing data') {
                        res.status(400).send({
                            status: 'error',
                            message: devices[0],
                        })
                    } else {
                        gateway.devices = devices;
                        gateway = await gateway.save();

                        Gateway.find({ serial: gateway.serial }).populate('devices').then(g =>
                            res.status(200).send({
                                status: 'success',
                                message: 'Gateway saved',
                                g
                            })
                        );
                    }

                } catch (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: err.message || 'Gateway not saved',
                    });

                }

            } else {
                return res.status(400).send({
                    status: 'error',
                    message: 'Invalid Data',
                });

            }


        });
    },

    getGateways: async (req, res) => {
        try {
            await Gateway.find().populate('devices').then(gateways =>
                res.status(200).send({
                    status: 'success',
                    message: 'Currently stored gateways: ' + gateways.length,
                    gateways
                })
            );
        } catch (err) {
            return res.status(500).send({
                status: 'error',
                message: err.message || 'Gateway cant be show',
            });
        }
    },

    getGatewayBySerial: async (req, res) => {

        // get serial number by URL
        let serialNumber = req.params.serial;
        // find and show searched Gateway
        try {
            await Gateway.find({ serial: serialNumber }).populate('devices').then(function (gateway) {
                if (gateway.length == 0) {
                    res.status(404).send({
                        status: 'error',
                        message: 'Gateway not found',
                    });
                }
                else {
                    res.status(200).send({
                        status: 'success',
                        message: 'Gateway found',
                        gateway
                    });
                }
            })
        } catch (err) {
            return res.status(500).send({
                status: 'error',
                message: err.message || 'Gateway cant be show or',
            });
        }
    },

    getGatewayByName: async (req, res) => {
        // get serial number by URL
        let gatewayName = req.params.name;
        // find and show searched Gateway
        try {
            await Gateway.find({ name: gatewayName }).populate('devices').then(function (gateway) {
                if (gateway.length == 0) {
                    res.status(404).send({
                        status: 'error',
                        message: 'Gateway not found',
                    });
                }
                else {
                    res.status(200).send({
                        status: 'success',
                        message: 'Gateway found',
                        gateway
                    });
                }
            });

        } catch (err) {
            return res.status(500).send({
                status: 'error',
                message: err.message || 'Gateway cant be show',
            });
        }
    },

    addDevice: async (req, res) => {

        let data = [];

        // get serial number by url
        let serialNumber = req.params.serial;
        // get Device data by body
        let device = req.body;
        try {
            /*not need to validate serialNumber because it is sended from frontend without user intervention*/
            var vendorValidation = !validator.isEmpty(device[0].vendor);
            var statusValidation = !validator.isEmpty(device[0].status);
        } catch (err) {
            return res.status(500).send({
                status: 'error',
                message: err.message || 'validation error',
            });
        }
        if (vendorValidation && statusValidation) {
            // get searched gateway and new devices
            data = await add(serialNumber, device);
            if (data.length == 0) {
                res.status(404).send({
                    status: 'error',
                    message: 'Gateway not found',

                });
            }
            else if(data[0]==='Limit of devices reached'){
                res.status(400).send({
                    status: 'error',
                    message: data[0],

                });
            }
            else {
                // update gateway
                try {
                    await Gateway.findOneAndUpdate({ serial: serialNumber }, { devices: data }, { new: true }).populate('devices').then(gateway =>
                        res.status(200).send({
                            status: 'success',
                            message: 'Gateway updated',
                            gateway
                        })
                    )
                } catch (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: err.message || 'Gateway cant be show',
                    });
                }
            }
        } else {
            return res.status(400).send({
                status: 'error',
                message: 'Device data is invalid',
            });
        }
    },

    removeDevice: async (req, res) => {
        let data = [];
        // get serial number by url
        let serialNumber = req.params.serial;
        // get device uid
        let deviceUID = req.body.UID;
        // invoke del function del
        data = await del(serialNumber, deviceUID);

        if (data[0] === 'Gateway not found') {
            res.status(404).send({
                status: 'error',
                message: data[0],

            });
        }
        else if (data[0] === 'Device not found') {
            res.status(404).send({
                status: 'error',
                message: data[0],

            });
        }


        else {
            // update gateway
            try {
                await Gateway.findOneAndUpdate({ serial: serialNumber }, { devices: data }, { new: true }).populate('devices').then(gateway =>
                    res.status(200).send({
                        status: 'success',
                        message: 'Gateway updated',
                        gateway
                    })
                )
            } catch (err) {
                return res.status(500).send({
                    status: 'error',
                    message: err.message || 'Gateway cant be show',
                });
            }

        }



    }


}

module.exports = controller;