const server = require('./server.js');
const request = require('supertest');


describe('server.js', () => {

    it('should run in a testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    // http stataus code
    // format of responses
    // content of responses
    describe('GET /', () => {

        it('should return 200 (async)', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        });

        it('should return json', async () => {
            const res = await request(server).get('/');
            expect(res.type).toBe('application/json');
        });

        it('should return {api :"up"}', async () => {
            const res = await request(server).get('/');
            expect(res.body).toEqual({ api: "up" });
        })

    });

});