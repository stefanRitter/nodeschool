'use strict';

var assert = require('assert'),
    Todo = require('./todo'),
    todo = new Todo(),
    testsCompleted = 0;


function deleteTest () {
  todo.add('Delete Me');
  assert.equal(todo.getCount(), 1, '1 item should exist');

  todo.deleteAll();
  assert.equal(todo.getCount(), 0, 'No items should exist');
  testsCompleted += 1;
}

function addTest () {
  todo.deleteAll();
  todo.add('Added');
  assert.notEqual(todo.getCount(), 0, '1 item should exist');
  testsCompleted += 1;
}

function throwsTest() {
  assert.throws(todo.add, /requires/);
  testsCompleted += 1;
}

function doAsyncTest (cb) {
  todo.doAsync(function (value) {
    assert.ok(value, 'Callback should be passed true');
    testsCompleted += 1;
    cb();
  });
}

deleteTest();
addTest();
throwsTest();
doAsyncTest(function () {
  console.log('completed ' + testsCompleted + ' tests');
});