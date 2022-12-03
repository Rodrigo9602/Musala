const routes = require('../routes/gateway.routes');
const request = require('supertest');


var params = {
    name: 'gateway1',
    ipv4: '192.168.117.12',
    devices: [
        {   
            vendor: 'Intel',
            status: 'Online'

        },
        {
            vendor: 'AMD',
            status: 'Offline'
        }
    ],
};

describe('Post /',()=>{
    test('should responde with error code 500 if cant access database', async()=>{
        const response = await request(routes).get('/').send();
        console.log(response);
    })
})
