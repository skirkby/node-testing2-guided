const knex = require('knex');
const config = require('../knexfile.js');

//----------------------------------------------------------------------------//
//
// this is where we ensure that we are using the correct environment... there
// should be an environment variable called DB_ENV that specifies which config
// section of the knexfile.js configuration file for knex to use.
//
// Why does the environment variable need to be named DB_ENV? Because that's the
// one we are looking for below.
//
// If the code below said:
//
//      const environment = process.env.MONKEYS || 'development';
//
// ... then the environment variable we set in .env or in the package.json
// scripts section (for the "test" script) would need to be named MONKEYS.
// 
// No matter what the environment variable is named, the *value* of it needs to
// match the environment object/cofig we want to use from knexfile.js. 
// 
// Here, we are using the value of the environment variable (a string) as an
// index into the array of properties on the object exported from knexfile.js. 
// 
// (In case you didn't know it, if you had:
//    const a = {prop1: "val1", prop2: "val2"};
// ... you could access a['prop1'] ... a['prop1'] === "val1")
//
//----------------------------------------------------------------------------//
const environment = process.env.DB_ENV || 'development';

module.exports = knex(config[environment]);
