const db = require("../../data/dbConfig.js");
const Hobbits = require('./hobbits-model.js');

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

describe('hobbits model', () => {
    describe('insert()', () => {
        it('should insert the provided hobbits into the db', async () => {
            await Hobbits.insert({ name: 'gaffer' });
            await Hobbits.insert({ name: 'sam' });

            const hobbits = await db('hobbits');
            expect(hobbits).toHaveLength(2);
        });

        test('should insert the provided hobbit into the db', async () => {
            let hobbit = await Hobbits.insert({ name: 'gaffer' });
            expect(hobbit.name).toBe('gaffer');

            hobbit = await Hobbits.insert({ name: 'sam' });
            expect(hobbit.name).toBe('sam');

        })
    });
});