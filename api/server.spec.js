const request = require('supertest');
const db = require('../data/dbConfig.js');
const { testing } = require('../knexfile.js');
const server = require('./server.js');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('hobbits').truncate();
});

afterAll(async () => {
    await db.destroy();
});

describe('server.js', () => {
    test('set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('GET /', () => {
        test('returns 200 OK', () => {
            return request(server).get('/')
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });

        test('returns 200 OK async', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        });

        test('returns JSON', async () => {
            const res = await request(server).get('/');
            expect(res.type).toBe('application/json');
        });

        test('returns {api:"up"}', async () => {
            const res = await request(server).get('/');
            expect(res.body).toEqual({ api: 'up' });
        });
    });

});