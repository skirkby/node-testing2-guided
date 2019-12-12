const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

//----------------------------------------------------------------------------//
// Most of these methods don't do anything. You should write tests that describe
// what they SHOULD do, then come back here and write the code to make it so. 
// 
// Since it's Christmas time, enjoy this:
// https://www.youtube.com/watch?v=sZt6eU5REN8 
//
//----------------------------------------------------------------------------//
async function insert(hobbit) {
  const [id] = await db('hobbits').insert(hobbit, 'id');

  return db('hobbits')
    .where({ id })
    .first();
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return null;
}

function getAll() {
  return db('hobbits');
}

function findById(id) {
  return null;
}
