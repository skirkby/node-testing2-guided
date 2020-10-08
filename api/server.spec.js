//----------------------------------------------------------------------------//
//
// in this test suite, we use supertest to generate API calls into our express
// API server.
//
// so we need to require() both supertest (don't forget to npm -i or yarn add
// it), and our server object.
//
// in order for this to work right, we need to make sure that we are
// *instantiating* the express server in one file (along with all of the
// middleware methods, routers, etc.), and that we are *starting* the server to
// listen on another... See notes in ./api/server.js for more context.
//
// the test framework (jest) doesn't manage starting and stopping servers, etc.,
// so if we did server.listen() in the server.js file, then every time jest ran
// a test on our server object, the server would begin listening on the one port
// we are configured to listen on. And the second test that tried to run in
// parallel would fail, because it would try to start the server listening on
// that same port again. Each test execution is in its own environment, so each
// one needs its own copy of Express. We can't have Express start up on the same
// port for each of them, because only one instance can use any given port. 
//
// in our setup, we are creating (and exporting) the express server object in
// server.js, and start it listening in index.js (after require()'ing it, which
// we also do in index.js) for production, development, etc. 
//
// For our tests, supertest is able to take the Express.server() instance, and
// start it on an ephemeral port (see
// https://en.wikipedia.org/wiki/Ephemeral_port). That way, each time we make a
// request, express is started on a unique port, and tests can run in parallel. 
//
//----------------------------------------------------------------------------//
const server = require('./server.js');
const request = require('supertest');

//----------------------------------------------------------------------------//
// create a section for server tests
//----------------------------------------------------------------------------//
describe('server.js', () => {
    //------------------------------------------------------------------------//
    //
    // simple test to verify if we are in the right environment... our expected
    // results would be wrong if we are in the wrong environment.
    // 
    // When we run the "test" script from package.json, the cross-env package is
    // used to set the DB_ENV environment variable to "testing". That's what
    // causes this to succeed. If you try to run "jest" at the command line
    // (without the "test" script syntax that sets the DB_ENV environment
    // variable), this test will fail, because DB_ENV won't be set to anything.
    //
    // read up on the jest "--bail" flag about how you could prevent any other
    // tests from running (and potentially truncate()'ing the wrong DB, etc.) if
    // a test fails...
    //
    // it's not perfect, as it stops ALL test suites upon a failure of ANY test,
    // but it's a start...
    //
    // from what I have read, adding an ability for a failed test to stop the
    // current suite, or all suites, configurably, is something that is often
    // requested from jest... maybe it will be there some day.
    //
    //------------------------------------------------------------------------//
    test('should be the testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    //------------------------------------------------------------------------//
    // tests for GET / 
    // 
    // typical HTTP API things we test for:
    //
    //   * http status code (ex. 200, 401, 500, etc.)
    //   * format of the data (JSON, XML, etc.)
    //   * structure of the return data ({field: 'value', field2: 'etc' ...})
    //
    //------------------------------------------------------------------------//
    describe('GET /', () => {
        //--------------------------------------------------------------------//
        // test for status code
        //
        // note the async decoration on the arrow function callback... we need
        // that because we use await inside the function.
        //
        // we need await so we can get jest to wait until our call to
        // request(server).get() resolves... otherwise, the test method will
        // return before the .get() method resolves. It will always look like it
        // passes.
        //
        // there are three ways to prevent a test method (like it()) from
        // exiting before an async method that it depends on finishes:
        //
        // 1) use the .then().catch() syntax. .get() returns a promise (which is
        //      then-able)
        // 2) instead of having a callback with an empty argument list, accept a
        //      single parameter called "done", which is a method, and call
        //      done() after the expect() clause. (See below for a link to
        //      documentation on this.)
        // 3) use the async/await syntax, instead of the promise .then().catch()
        //      syntax. This is my fav, and what I use below. MUCH more
        //      readable, and simple to implement.
        //
        // see https://jestjs.io/docs/en/asynchronous.html for more/other info
        // on testing with async methods.
        //
        //
        // one other thing to note: supertest is built on superagent, which is
        // basically an HTTP client with an awesome API.
        //
        // supertest provides not only a way to make a request and get a
        // response, but it also manages the starting of our express server so
        // the superagent part of supertest (i.e. the HTTP client) can have
        // something to send a request to. It starts Express on an ephemeral
        // port. (Are you tired of me saying "ephemeral"? I predict you will
        // legit use it in a sentence this week.)
        //
        // in addition to all of this, supertest *also* provides a collection of
        // "expect()" method calls that perform a similar function to the jest
        // expect() method with all of the "matchers" that are implemented in
        // jest.
        //
        // the problem is that the .expect() method in supertest, and the
        // expect() method in jest, *have the same name*.
        //
        // so if you wanted to look at the documentation for supertest, you
        // would see something like:
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
        // DON'T BE FOOLED! The "expect()" that you see in that snippet is the
        // supertest version of expect(), not the jest version.
        //
        // also, in this sample code above, the "describe()" and "it()" methods
        // are referring to methods in another framework called "mocha", which
        // is similar to jest (but they are different).
        //
        // you could use the .expect() methods in supertest to validate your api
        // responses, but it would be out of bounds with respect to the rest of
        // your test suite framework, which will be jest.
        //
        // so we only use supertest to 1) launch our http server, and 2) use
        // superagent to issue a request to the http server, and 3) return the
        // result to our test code, where we can use jest to validate it (using
        // matchers). We do not use the supertest expect() methods and matchers.
        //
        //--------------------------------------------------------------------//
        it('should return 200 OK', async () => {
            const res = await request(server).get('/');
            console.log(res);
            expect(res.status).toBe(200);
        });

        // does it return the right data type?
        //--------------------------------------------------------------------//
        // 
        // The "response" object returned by the supertest HTTP client
        // (superagent) HTTP requests has properties that allow us to examine
        // the response from our Express() app. 
        // 
        // One of the properties is ".type", which will contain the value of the
        // "Content-Type" header in the response (or at least part of it...
        // Content-Type headers can have compound values - multiple values
        // separated with semicolons. The only part of the Content-Type header
        // we care about is the part that actually describes the "type" (of
        // format) of the contents in the body.)
        // 
        // We will test the "shape" of the body contents in a different test ...
        // Here, we just test that the server *claims* that it sent JSON in the
        // response body. 
        // 
        //--------------------------------------------------------------------// 
        it('should be json', async () => {
            const res = await request(server).get('/');
            expect(res.type).toBe('application/json');
        })

        // does it return the right data?
        //--------------------------------------------------------------------//
        //
        // You know how the Express.json() middleware method takes a stringified
        // JSON object in the request and turns it into an *actual* JSON object
        // in req.body? Well, supertest does something similar... it takes a
        // stringified JSON object in the response and turns it into a *real*
        // JSON object in res.body.
        //
        // This allows us to interact with the response body as an object. And
        // one of the things we can do is a "deep" inspection of the body
        // object, and compare it with another object, to see if they are equal.
        //
        // Because constants or variables that "contain" an object are actually
        // references to the object, two different objects can have exactly the
        // same shape with exacly the same properties and exactly the same
        // values for those properties, but they will not be "equal". 
        //
        // Try this in a Node.js REPL:
        //
        //
        //   const assert = require('assert');
        //
        //   const a = {property: "value"}; const b = {property: "value"};
        //
        //   if (a == b) {console.log("yep, they the same")} else
        //     {console.log("nope, they differnt")
        //   }
        //
        //   try {assert.deepEqual(a,b); console.log('they shore look the
        //     same...')} catch {console.log('yeah, I new it. They look TOTALLY
        //     differnt.')    
        //   }
        //
        //
        // Supertest.toEqual() uses this "deepEqual()" capability to compare the
        // res.body with the value in .toEqual().
        //--------------------------------------------------------------------//
        it('should return the right object', async () => {
            const res = await request(server).get('/');
            expect(res.body).toEqual({ api: 'up' });
        })
    });
});