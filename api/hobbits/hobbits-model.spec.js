const db = require('../../data/dbConfig.js');
const Hobbits = require('./hobbits-model.js');
const dbConfig = require('../../knexfile.js')['testing'];

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

describe('hobbits model', () => {
    describe('insert()', () => {
        test('should insert provided hobbits', async () => {
            await Hobbits.insert({ name: 'gaffer' });
            await Hobbits.insert({ name: 'sam' });

            const hobbits = await db('hobbits');
            expect(hobbits).toHaveLength(2);
        });

        test('inserting returns the inserted hobbit', async () => {
            let hobbit = await Hobbits.insert({ name: 'gaffer' });
            expect(hobbit.name).toBe('gaffer');

            hobbit = await Hobbits.insert({ name: 'sam' });
            expect(hobbit.name).toBe('sam');
        });


    })
})