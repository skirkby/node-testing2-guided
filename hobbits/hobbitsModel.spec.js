const db = require('../data/dbConfig.js');
const Hobbits = require('./hobbitsModel.js');

//----------------------------------------------------------------------------//
// 
// See ./api/server.spec.js for some info on the jest methods etc. 
// 
//----------------------------------------------------------------------------//

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

        //----------------------------------------------------------------------------//
        // 
        // jest.beforeEach() specifies a method that is executed before each test. You
        // would use this to do any setup or value initialization needed before *every*
        // test.
        // 
        //----------------------------------------------------------------------------//

        beforeEach(async () => {
            await db('hobbits').truncate();
        })
    });
});
