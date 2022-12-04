const app = require('../app');
const request = require('supertest');
const mongoose = require('mongoose');
const Gateway = require('../models/gateway.model');
var {serial, gatewayParams, gatewayWithTenDevices, name, UID, count} = require('./global_test_var');





describe('Gateways api', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/apiRest-Gateways-test');

    });
    afterAll(async () => {
        await mongoose.disconnect();
    });



     describe('POST /gateways/', () => {

        it('Route is working and object is succefully saved', async () => {
            count = Math.floor(Math.random() * 1000);
            gatewayParams.name += String(count);            
            let response = await request(app).post('/gateways/').send(gatewayParams);         
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
            expect(response.body.message).toBe('Gateway saved');
        });

        it('If Gateway already exits it should send a 400 status error', async () => {
            let response = await request(app).post('/gateways/').send(gatewayParams);
            expect(response.status).toBe(400);
        });

        it('If ipv4 is not a valid ipv4 address or gateway fields are empty then it should send a 400 error', async () => {
            count = Math.floor(Math.random() * 1000);
            gatewayParams.name += String(count);
            gatewayParams.ipv4 = '1050:0:0:0:5:600:300c:326b';
            let response = await request(app).post('/gateways/').send(gatewayParams);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Invalid Data');
        });

        it('If some field is missing from device  it should send a 400 status error', async () => {
            count = Math.floor(Math.random() * 1000);
            gatewayParams.name += String(count);
            gatewayParams.ipv4 = '192.168.117.12';
            gatewayParams.devices[0].vendor = '';
            let response = await request(app).post('/gateways/').send(gatewayParams);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Missing data');
        });



    });



    describe('GET /gateways/', () => {
        it('Route is working', async () => {
            let response = await request(app).get('/gateways/').send();            
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });
        it('Api return a Gateways Array after GET', async () => {
            let response = await request(app).get('/gateways/').send();
            expect(response.body.gateways).toBeInstanceOf(Array);
        });
        it('Api return a Gateway object on each element of the gateway field on body after GET', async () => {
            let response = await request(app).get('/gateways/').send();
            for (var i = 0; i < response.body.gateways.length; i++) {
                expect(response.body.gateways[i]).toBeInstanceOf(Object);
                expect(response.body.gateways[i]).toMatchObject < Gateway > ({});
            }

        });
    });



    describe('GET /gateways/:serial',()=>{            
                
        it('Route is working', async()=>{   
            count = Math.floor(Math.random() * 1000);
            gatewayParams.name += String(count); 
            gatewayParams.devices[0].vendor = 'Ryzen';                       
            let saveResponse = await request(app).post('/gateways/').send(gatewayParams);             
            serial = saveResponse.body.g[0].serial;
            let response = await request(app).get('/gateways/'+serial).send();        
            expect(response.status).toBe(200);    
            expect(response.headers['content-type']).toContain('json');             
        });
        it('Api return a Gateways Array after GET', async()=>{
            let response = await request(app).get('/gateways/'+serial).send();
            expect(response.body.gateway).toBeInstanceOf(Array);
        });
        it('Api return a Gateway object as element of the gateway field on body after GET', async()=>{
            let response = await request(app).get('/gateways/'+serial).send();           
            for( var i=0; i<response.body.gateway.length;i++){
                expect(response.body.gateway[i]).toBeInstanceOf(Object);
                expect(response.body.gateway[i]).toMatchObject<Gateway>({});
            }

        });
        it('Api return status 500 when can find require Gateway after GET', async()=>{
            let response = await request(app).get('/gateways/145263-688d-43e0-aeb1-7778ca15d9c4').send();
            expect(response.status).toBe(404);             
        });
    });



    describe('GET /gateways/find/:name',()=>{
        it('Route is working', async()=>{
            count = Math.floor(Math.random() * 1000);
            gatewayParams.name += String(count);
            let saveResponse = await request(app).post('/gateways/').send(gatewayParams);             
            name = saveResponse.body.g[0].name;

            let response = await request(app).get('/gateways/find/'+name).send();        
            expect(response.status).toBe(200);    
            expect(response.headers['content-type']).toContain('json');              
        });
        it('Api return a Gateways Array after GET', async()=>{
            let response = await request(app).get('/gateways/find/'+name).send();
            expect(response.body.gateway).toBeInstanceOf(Array);
        });
        it('Api return a Gateway object as element of the gateway field on body after GET', async()=>{
            let response = await request(app).get('/gateways/find/'+name).send();           
            for( var i=0; i<response.body.gateway.length;i++){
                expect(response.body.gateway[i]).toBeInstanceOf(Object);
                expect(response.body.gateway[i]).toMatchObject<Gateway>({});
            }

        });
        it('Api return status 500 when can find require Gateway after GET', async()=>{
            let response = await request(app).get('/gateways/find/notfound').send();
            expect(response.status).toBe(404);             
        });
    });




    describe('PUT /gateways/:serial', ()=>{
        it('Route is working', async()=>{          
            let response = await request(app).put('/gateways/'+serial).send([{"vendor":"Test", "status":"Online"}]);        
            expect(response.status).toBe(200);    
            expect(response.headers['content-type']).toContain('json');                         
        });
        it('Device is added gateway must have their original length + 1', async()=>{
            let response = await request(app).get('/gateways/'+serial).send();            
            let originalLength = response.body.gateway[0].devices.length;
            let secondResponse = await request(app).put('/gateways/'+serial).send([{"vendor":"Test", "status":"Online"}]);
            let lengthAfterAdd = secondResponse.body.gateway.devices.length;
            UID = secondResponse.body.gateway.devices[lengthAfterAdd-1].uid;     
            expect(lengthAfterAdd).toBeGreaterThan(originalLength);
        });       
        it('If gateway serial is not found it should return a 404 gateway not found error', async()=>{
            let response = await request(app).put('/gateways/1458996e-58fb-4791-8451-37b6af3ac0a2').send([{"vendor":"Test", "status":"Online"}]);
            expect(response.status).toBe(404);
        });
        it('Device data is missing should return a 400 status error', async()=>{
            let response = await request(app).put('/gateways/'+serial).send([{"vendor":"", "status":"Online"}]);
            expect(response.status).toBe(400);
        });
        it('If Gateway devices are 10 it should return a 400 error message', async()=>{
            count = Math.floor(Math.random() * 1000);
            gatewayWithTenDevices.name+= String(count);
            let saveResponse = await request(app).post('/gateways/').send(gatewayWithTenDevices);
            expect(saveResponse.status).toBe(200);            
            let response = await request(app).put('/gateways/'+saveResponse.body.g[0].serial).send([{"vendor":"Test", "status":"Online"}]);
             expect(response.status).toBe(400);
            expect(response.body.message).toBe('Limit of devices reached');
        });
        

    });

    describe('PUT /gateways/del/:serial', ()=>{
        it('Route is working', async()=>{

            let response = await request(app).put('/gateways/del/'+serial).send({"UID":UID});        
            expect(response.status).toBe(200);    
            expect(response.headers['content-type']).toContain('json');                         
        });
        it('Device is deleted gateway must have their original length - 1', async()=>{
            let response = await request(app).get('/gateways/'+serial).send();            
            var deviceUID = response.body.gateway[0].devices[0].uid;           
            let originalLength = response.body.gateway[0].devices.length;
            let secondResponse = await request(app).put('/gateways/del/'+serial).send({"UID":deviceUID});           
            let lengthAfterDel = secondResponse.body.gateway.devices.length;
            var status = false;
            if(lengthAfterDel-originalLength==-1){
                status = true;
            }
            expect(originalLength).toBeGreaterThan(lengthAfterDel);
        });
        it('If gateway serial is not found it should return a 404 gateway not found error', async()=>{
            let response = await request(app).put('/gateways/del/b3cf84c5-688d-43e0-aeb1-7778ca15d9c4').send({"UID":UID});
            expect(response.status).toBe(404);
        });
        
    });

});



