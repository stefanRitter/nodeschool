'use strict';

var memdb = require('./memdb'),
    assert = require('assert');

describe('memdb', function () {
  beforeEach(function() {
    memdb.clear();
  });

  describe('.first(obj)', function() {
    it('should return the first matching document', function() {
      var tobi = { name: 'Tobi'},
          loki = { name: 'Loki'};

      memdb.save(tobi);
      memdb.save(loki);

      var ret = memdb.first({name: 'Tobi'});
      assert(ret === tobi);

      ret = memdb.first({name: 'Loki'});
      assert(ret === loki);
    });

    it('should return undefined when no doc matches', function () {
      var ret = memdb.first({name: 'Manny'});
      assert(ret === undefined);
    });
  });

  describe('.save(doc)', function () {
    it('should save the document', function () {
      var pet = { name: 'Tobi' };
      memdb.save(pet);
      var ret = memdb.first({ name: 'Tobi' });
      assert(ret === pet);
    });
  });

  describe('.save(doc, cb) - async', function () {
    it('should save the document', function (done) {
      var pet = {name: 'Tobi'};
      memdb.save(pet, function () {
        var ret = memdb.first({name: 'Tobi'});
        assert(ret === pet);
        done();
      });
    });
  });
});
