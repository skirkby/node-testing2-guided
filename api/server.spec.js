
const server = require('./server.js');
const request = require('supertest');


describe('server.js', () => {

    test('check for testing env', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });



    describe('GET /', () => {
        // return code under various circumstances
        // return object syntax
        // return object value

        // test('returns 200 OK', () => {
        //     return request(server)
        //         .get('/')
        //         .then(res => {
        //             expect(res.status).toBe(200);
        //         });
        // });

        test('async returns 200 OK', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        });

        test('response body is JSON', async () => {
            const res = await request(server).get('/');
            expect(res.type).toBe('application/json');
        });

        test('returns {api:"up"}', async () => {
            const res = await request(server).get('/');
            expect(res.body).toEqual({ api: "up" });
        });

    });

});