const Hobbits = require('./hobbitsModel.js');
const db = require('../data/dbConfig.js');

describe('hobbits model', () => {
    describe('insert()', () => {

        beforeEach(async () => {
            await db('hobbits').truncate();
        });

        test('inserts the provided hobbits', async () => {
            await Hobbits.insert({ name: 'gaffer' });
            await Hobbits.insert({ name: 'sam' });

            const hobbits = await db('Hobbits');
            expect(hobbits).toHaveLength(2);
        });

        test('returns the inserted object', async () => {
            let hobbit = await Hobbits.insert({ name: 'gaffer' });
            expect(hobbit.name).toBe('gaffer');

            hobbit = await Hobbits.insert({ name: 'sam' });
            expect(hobbit.name).toBe('sam');

        });


    });
});