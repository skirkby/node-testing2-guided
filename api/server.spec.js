const db = require('../data/dbConfig.js');
const server = require('./server.js');
const request = require('supertest');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('hobbits').truncate();
});

afterAll(async () => {
    await db.destroy();
})


describe('server.js', () => {

    test('we are in the testing env', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('GET /', () => {
        let res;
        beforeEach(async () => {
            res = await request(server).get('/');
        });

        // is the result code value right?
        test('returns 200 OK', () => {
            return request(server)
                .get('/').then(res => { expect(res.status).toBe(200) });
        });

        test('return 200 OK async', async () => {
            // const res = await request(server).get('/');
            expect(res.status).toBe(200);
        });

        // is the return data of the correct type?
        test('returns json type', async () => {
            // const res = await request(server).get('/');
            expect(res.type).toBe('application/json');
        });

        // is the return data of the correct value?  
        test('returns {api:"up"}', async () => {
            // const res = await request(server).get('/');
            expect(res.body).toEqual({ api: 'up' });
        });
    });

})