'use strict';

const R = require('ramda');
const run = require('./run');

const echo = R.curry(function (val, cb) {
  setTimeout(() => cb(null,val),10);
});

function fail(cb) {
  setTimeout(() => cb("i failed"),10);
}

function *program() {
  console.log("10",yield echo(10));
  try {
    yield fail;
  } catch (x) {
    console.log("failure",x);
  }
}

run(program);
