const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
    test('should set testing environment var', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })

    describe('GET /', () => {
        let res = {};
        beforeEach(async () => {
            res = await request(server).get('/');
        });

        // test('should return 200 ok', () => {
        //     return request(server)
        //         .get('/')
        //         .then(res => {
        //             expect(res.status).toBe(200);
        //         });
        // });

        // test('should return 200 ok using async', async () => {
        //     const res = await request(server).get('/');
        //     expect(res.status).toBe(200);
        // });

        // test('should return JSON', async () => {
        //     const res = await request(server).get('/');
        //     expect(res.type).toBe('application/json');
        // })

        // test('should return {api:up}', async () => {
        //     const res = await request(server).get('/');
        //     expect(res.body).toEqual({ api: 'up' });
        // });

        test('should return 200 ok', () => {
            expect(res.status).toBe(200);
        });

        test('should return 200 ok using async', async () => {
            // const res = await request(server).get('/');
            expect(res.status).toBe(200);
        });

        test('should return JSON', async () => {
            // const res = await request(server).get('/');
            expect(res.type).toBe('application/json');
        })

        test('should return {api:up}', async () => {
            // const res = await request(server).get('/');
            expect(res.body).toEqual({ api: 'up' });
        });
    });

});