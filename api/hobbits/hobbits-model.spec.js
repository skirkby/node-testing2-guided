const Hobbits = require('./hobbits-model.js');
const db = require('../../data/dbConfig.js');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('hobbits').truncate();
    // await db.seed.run();
});

afterAll(async () => {
    await db.destroy();
});

describe('hobits model tests', () => {
    describe('insert() tests', () => {
        test('should insert the right # of records', async () => {
            await Hobbits.insert({ name: 'gaffer' });
            await Hobbits.insert({ name: 'sammy' });

            const hobbits = await db('hobbits');
            console.log(hobbits);
            expect(hobbits).toHaveLength(2);
        });

        test('should return the record inserted', async () => {
            let hobbit = await Hobbits.insert({ name: 'gaffer' });
            expect(hobbit.name).toBe('gaffer');

            hobbit = await Hobbits.insert({ name: 'sam' });
            expect(hobbit.name).toBe('sam');

        })
    });
});