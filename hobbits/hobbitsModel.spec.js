const db = require('../data/dbConfig.js');
const Hobbits = require('./hobbitsModel.js');

describe('hobbits model', () => {
    describe('insert()', () => {
        it('should insert the provided hobbits into the DB', async () => {
            await Hobbits.insert({ name: 'gaffer' });
            await Hobbits.insert({ name: 'sam' });

            const hobbits = await db('hobbits');
            expect(hobbits).toHaveLength(2);
        });

        it('should return what was inserted', async () => {
            let hobbit = await Hobbits.insert({ name: 'gaffer' });
            expect(hobbit.name).toBe('gaffer');

            hobbit = await Hobbits.insert({ name: 'sam' });
            expect(hobbit.name).toBe('sam');
        });

        beforeEach(async () => {
            await db('hobbits').truncate();
        })
    });
});