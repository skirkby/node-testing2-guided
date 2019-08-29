
//
// in this test suite, we use supertest
// to generate API calls into our express
// API server.
//
// so we need to require() both supertest (
// don't forget to npm -i or yarn add it),
// and our server object.
//
// in order for this to work right, we need to 
// make sure that we are *instantiating* the
// express server in one file (along with all
// of the middleware methods, routers, etc.),
// and that we are *starting* the server to listen 
// on another... 
// 
// the test framework (jest) doesn't manage starting
// and stopping servers, etc., so if we did server.listen()
// in the server.js file, then every time jest/supertest
// ran a test on our server object, the server would begin
// listening on the one port we are configured to listen
// on.
//
// in our setup, we are creating (and exporting) the express
// server object in server.js, and start it listening in
// index.js (after require()'ing it, which we also do in
// index.js.)
//
const request = require('supertest');
const server = require('./server.js');

//
// create a section for server tests
//
describe('server.js', () => {
    //
    // simple test to verify if we are in the 
    // right environment... our expected results
    // would be wrong if we are in the wrong 
    // environment.
    //
    // read up on the jest "--bail" flag about 
    // how you could prevent any other tests from
    // running (and potentially truncate()'ing the
    // wrong DB, etc.) if a test fails...
    //
    // it's not perfect, as it stops ALL test suites 
    // upon a failure of ANY test, but it's a start...
    //
    // from what I have read, adding an ability for
    // a failed test to stop the current suite, or all
    // suites, configurably, is something that is often
    // requested from jest... maybe it will be there some
    // day.
    //
    it('should set the testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })

    //
    // typical HTTP API things we test for:
    //
    //      http status code (ex. 200, 401, 500, etc.)
    //      format of the data (JSON, XML, etc.)
    //      structure of the return data ({field: 'value', field2: 'etc' ...})
    //

    //
    // an inner section for testing GET /
    //
    describe('GET /', () => {

        //
        // test for status code
        // 
        // note the async decoration on the arrow function
        // callback... we need that because we use await
        // inside the function.
        //
        // we need await so we can get jest to wait until
        // our call to request(server).get() returns...
        // otherwise, the test method will exit before
        // the .get() method returns, and our test results
        // will not be predictable, and will not be accurate.
        //
        // there are three ways to prevent a test method
        // (like it()) from exiting before an async method
        // that it depends on finishes:
        //
        // 1) use the .then().catch() syntax. .get() returns a promise
        //      (which is then-able)
        // 2) instead of having a callback with an empty argument list,
        //      accept a single parameter called "done", which is a method,
        //      and call done() after the expect() clause. (See below for
        //      a link to documentation on this.)
        // 3) use the async/await syntax, instead of the promise .then().catch()
        //      syntax. This is my fav, and what I use below. MUCH more readable,
        //      and simple to implement.
        //
        // see https://jestjs.io/docs/en/asynchronous.html for
        // more/other info on testing with async methods.
        //
        //
        // one other thing to note: supertest is built on superagent,
        // which is basically an HTTP client with an awesome API.
        //
        // supertest provides not only a way to make a request
        // and get a response, but it also manages the starting
        // of our express server so the superagent part of supertest
        // can have something to send a request to.
        //
        // in addition to all of this, supertest *also* provides
        // a collection of "expect()" method calls that perform
        // a similar function to the jest expect() method with all
        // of the "matchers" that are implemented in jest.
        //
        // the problem is that the .expect() method in supertest,
        // and the expect() method in jest, *have the same name*.
        //
        // so if you wanted to look at the documentation for
        // supertest, you would see something like:
        //
        //          describe('POST /users', function() {
        //              it('responds with json', function(done) {
        //                  request(app)
        //                      .post('/users')
        //                      .send({name: 'john'})
        //                      .set('Accept', 'application/json')
        //                      .expect('Content-Type', /json/)
        //                      .expect(200)
        //                      .end(function(err, res) {
        //                          if (err) return done(err);
        //                          done();
        //                      });
        //              });
        //          });
        //
        // DON'T BE FOOLED! The "expect()" that you see in that snippet
        // is the supertest version of expect(), not the jest version.
        // 
        // also, the "describe()" and "it()" methods are referring
        // to methods in another framework called "mocha", which is 
        // similar to jest (but they are different).
        //
        // you could use the .expect() methods in supertest to validate
        // your api responses, but it would be out of bounds with respect
        // to the rest of your test suite framework, which will be jset.
        //
        // so we only use supertest to 1) launch our http server, and 2)
        // use superagent to issue a request to the http server, and 3)
        // return the result to our test code, where we can use jest
        // to validate it (using matchers).
        //
        it('should return 200 ok',  async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        })

        //
        // test for format
        //
        // 
        it('should return a json object', async () => {
            const res = await request(server).get('/');
            expect(res.type).toBe('application/json');
        })

        //
        // test for json body structure
        //
        it('should return {api:"up"}', async () => {
            const res = await request(server).get('/');
            expect(res.body).toEqual({api:'up'});
        })
    })

})