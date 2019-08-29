
const db = require('../data/dbConfig.js');
const Hobbits = require('./hobbitsModel.js');

describe('hobbits model', () => {
    describe('insert()', () => {
        beforeEach(async ()=> {
            await db('hobbits').truncate();
        });

        it('should insert 2 hobbits', async () => {
            await Hobbits.insert({name: 'gaffer'});
            await Hobbits.insert({name: 'sam'});

            const hobbits = await db('hobbits');
            expect(hobbits).toHaveLength(2);
        })
    })
})