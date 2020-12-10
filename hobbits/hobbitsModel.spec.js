const Hobbits = require('./hobbitsModel.js');
const db = require('../data/dbConfig.js');


//----------------------------------------------------------------------------//
// 
// See ./api/server.spec.js for some info on the jest methods etc. 
// 
//----------------------------------------------------------------------------//

describe('hobbits model', () => {
    describe('insert()', () => {

        //----------------------------------------------------------------------------//
        // 
        // jest.beforeEach() specifies a method that is executed before each test. You
        // would use this to do any setup or value initialization needed before *every*
        // test.
        // 
        //----------------------------------------------------------------------------//

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

