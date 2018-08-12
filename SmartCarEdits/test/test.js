/* The functions in this module are used to test the SmartCar API.
   This testing depends on:
   Mocha - a javascript testframework for Node.js
   Chai -  a javascript assertion library
   Each API test iterates through both ids - 1234 and 1235
*/

const assert = require('assert');
const supertest = require('supertest');
const chai = require('chai');
const uuid = require('uuid');
const app = require('../server.js');

const expect = chai.expect;
const request = supertest(app);

const ids = ['1234', '1235'];
const actions = ['START', 'STOP'];

// Tests for Vehicle Info
describe('Vehicle Info', function() {
  for (var i in ids) {
    it('returns object of correct types for vehicle ' + ids[i], function(done) {
    request.get('/vehicles/' + ids[i])
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.be.a('object');                 // Check reponse is object
        expect(res.body.vin).to.be.a('string');             // Check vin is string
        expect(res.body.color).to.be.a('string');           // Check color is string
        expect(res.body.driveTrain).to.be.a('string');      // Check driveTrain is string
        expect(res.body.doorCount).to.be.below(5);          // Check doorCount is a number less than 5
        done(err);
      });
    });
  }

  it('returns 404 when incorrect id and error message is string', function(done) {
  request.get('/vehicles/' + 1233)
    .expect(404)
    .end(function(err, res) {
      expect(res.text).to.be.a('string');                   // Check error message is string
      done(err);
    });
  });
});

// Tests for Door Security
describe('Door Security', function() {
  for (var i in ids) {
    it('returns an array of objects for vehicle ' + ids[i], function(done) {
    request.get('/vehicles/' + ids[i] + '/doors')
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.be.an('array');                // Check array is returned
        expect(res.body).to.satisfy(function(body) {       // Check each object contains keys: location and locked
          for (j in body) {                                // Check location is string and locked is bool
            var door = body[j]
            if (!('location' in door) || !('locked' in door) || typeof(door.location) !== 'string' || typeof(door.locked) !== 'boolean') {
              return false
            }
            return true
          }
        });
        done(err);
      });
    });
  }

  it('returns 404 when incorrect id and error message is string', function(done) {
  request.get('/vehicles/' + 1233 + '/doors')
    .expect(404)
    .end(function(err, res) {
      expect(res.text).to.be.a('string');                  // Check error message is string
      done(err);
    });
  });
});

// Tests for Battery Level
describe('Battery Level', function() {
  for (var i in ids) {
    it('returns an object with key: percent where value is null or number for vehicle ' + ids[i], function(done) {
    request.get('/vehicles/' + ids[i] + '/battery')
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.satisfy(function(body) {      // Check percent is number or null
          if (typeof(res.body.percent) === 'number' || res.body.percent === null) {
            return true
          }
          return false
        });
        expect(Object.keys(res.body).length).to.eql(1);  // Check that there is only one key
        expect(res.body).to.be.a('object');              // Check that response is object
        done(err);
      });
    });
  }

  it('returns 404 when incorrect id and error message is string', function(done) {
  request.get('/vehicles/' + 1233 + '/battery')
    .expect(404)
    .end(function(err, res) {
      expect(res.text).to.be.a('string');                // Check error message is string
      done(err);
    });
  });
});

// Tests for Fuel Level
describe('Fuel Level', function() {
  for (var i in ids) {
    it('returns an object with key: percent where value is null or number for vehicle ' + ids[i], function(done) {
    request.get('/vehicles/' + ids[i] + '/fuel')
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.satisfy(function(body) {     // Check percent is number or null
          if (typeof(res.body.percent) === 'number' || res.body.percent === null) {
            return true
          }
          return false
        });
        expect(Object.keys(res.body).length).to.eql(1); // Check that there is only one key
        expect(res.body).to.be.a('object');             // Check that response is object
        done(err);
      });
    });
  }

  it('returns 404 when incorrect id and error message is string', function(done) {
  request.get('/vehicles/' + 1233 + '/fuel')
    .expect(404)
    .end(function(err, res) {
      expect(res.text).to.be.a('string');               // Check error message is string
      done(err);
    });
  });
});


// Test Start|Stop Engine
describe('Start|Stop Engine', function() {
  for (var i in ids) {
    for (var j in actions) {
      it('returns an object with key: percent where value is null or number for vehicle ' + ids[i] + ' with action ' + actions[j], function(done) {
      request.post('/vehicles/' + ids[i] + '/engine')
        .send({
            action: actions[j]
        })
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.satisfy(function(body) {    // Check reponse is either success or error
            if (body.status === 'success' || body.status === 'error') {
              return true
            }
            return false
          });
          expect(Object.keys(res.body).length).to.eql(1); // Check that there is only one key
          expect(res.body).to.be.a('object');             // Check that response is object
          done(err);
        });
      });
    }
  }

  it('returns 404 when incorrect id and error message is string', function(done) {
  request.post('/vehicles/' + 1233 + '/engine')
    .expect(404)
    .end(function(err, res) {
      expect(res.text).to.be.a('string');
      done(err);
    });
  });

  it('returns 404 when no action', function(done) {
  request.post('/vehicles/' + 1234 + '/engine')
    .send({
      test: 'test'
    })
    .expect(404)
    .end(function(err, res) {
      expect(res.text).to.be.a('string');
      done(err);
    });
  });

  it('returns 404 when wrong action', function(done) {
  request.post('/vehicles/' + 1234 + '/engine')
    .send({
      action: 'test'
    })
    .expect(404)
    .end(function(err, res) {
      expect(res.text).to.be.a('string');
      done(err);
    });
  });
});
