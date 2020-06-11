//----------------------------------------------------------------------------//
// This is the "connection string" for connecting to the PostgreSQL database
// server. We expect it to come from the environment, or we will default to a
// URL that is local. Heroku exports the URL for a PostgreSQL database in the
// DATABASE_URL environment variable, so in our "production" environment
// (Heroku), this works well. 
// 
// See "heroku_setup.md" for instructions on setting up a PG database in Heroku.
// 
// Also, note the "production" configuration object below. A "client" value of
// "pg" means we need the "pg" module installed. This is the PostgreSQL database
// driver.
//----------------------------------------------------------------------------//
const pgConnection = process.env.DATABASE_URL || "postgresql://postgres@localhost/hobbits";

//----------------------------------------------------------------------------//
// When we run unit tests, we often have "set up" and "tear down" in order to
// create the right environment for our tests. 
//
// One of the things that we may need to do, if we need to test our database
// methods, is empty or reset a database. But we may have valuable, important,
// or critical data in the database that is supporting our
// engineering/development efforts. 
//
// Or others' efforts! 
//
// So we want a "testing" environment that uses a different database... maybe
// even a specific database just for us (so it doesn't interfere with others.)
//
// The knex module supports different environments... the object that is being
// exported has multiple properties... this one has a property called
// "development", one called "testing", and another called "production". These
// contain options/settings/configuration for a specific environment, allowing
// us to treat them separately. 
//
// These are used when we initialize knex, in the ./data/dbConfig.js file.
// There, we get an instance of the function that the knex package exports, and
// call it with a configuration object. We can use a string as an index into
// this object: config['testing'] for example (assuming that "config" is the
// name of the constant/variable that we used when getting this exported
// object.) 
//
// In this project, we are using an environment variable, DB_ENV, to specify
// which environment in knex we want to use. 
//
// We could set that environment variable a variety of ways, including using the
// .env file (as we have done before... that may be important if you are
// deploying to something like Heroku.) Or, we can use a script definition in
// package.json to set the environment variable. 
//
// See package.json... we are using a package called "cross-env", which allows
// you to set environment variables using a common syntax, regardless of what
// operating system you are on, or what shell you are using.
//
// In our example, there, we are setting DB_ENV to "testing" using cross-env in
// the "test" script.
//
// This causes us to use the "testing" object below when knex is configured in
// ./data/dbConfig.js.
//----------------------------------------------------------------------------//
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/hobbits.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/test.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  production: {
    client: "pg",
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};
