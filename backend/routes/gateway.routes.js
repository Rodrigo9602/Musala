'use strict'

var express = require('express');
var router = express.Router();
var GatewayController = require('../controllers/gateway.controller');


router.post('/', GatewayController.save);
router.get('/', GatewayController.getGateways);
router.get('/:serial', GatewayController.getGatewayBySerial);
router.get('/find/:name', GatewayController.getGatewayByName);
router.put('/:serial', GatewayController.addDevice);
router.put('/del/:serial', GatewayController.removeDevice);
module.exports = router;