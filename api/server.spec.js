const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig.js');
const dbConfig = require('../knexfile.js')['testing'];

beforeAll(async () => {
    await db.migrate.rollback(dbConfig);
    await db.migrate.latest(dbConfig);
});

beforeEach(async () => {
    await db('hobbits').truncate();
});

afterAll(async () => {
    await db.destroy();
});

describe('server.js', () => {
    let res;
    beforeAll(async () => {
        res = await request(server).get('/');
    });

    test('testing environment env var', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('GET /', () => {
        test('returns 200', () => {
            return request(server)
                .get('/')
                .then(result => {
                    expect(result.status).toBe(200);
                });
        });

        test('returns 200, using async', async () => {
            expect(res.status).toBe(200);
        });

        test('should return json', async () => {
            expect(res.type).toBe('application/json')
        });

        test('should return {api:"up"', () => {
            expect(res.body).toEqual({ api: "up" });
        });
    });
});