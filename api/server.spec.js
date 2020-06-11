const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {
    it('should set testing environment', () => {
        return expect(process.env.DB_ENV).toBe('testing');
    });

    describe('GET /', () => {
        it('should return 200 OK', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });

        it('should return 200 OK with async/await', async () => {
            const res = await request(server).get('/');
            return expect(res.status).toBe(200);
        });

        it('should return JSON', async () => {
            const res = await request(server).get('/');
            return expect(res.type).toBe('application/json');
        });

        it('should return {api:"up"', async () => {
            const res = await request(server).get('/');
            return expect(res.body).toEqual({ api: 'up' });
        });
    });
});