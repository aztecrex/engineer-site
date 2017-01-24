'use strict';

const run = function (g) {
  let it = g();

  function iterate(err, res) {
    let cont;
    if (err)
      cont = it.throw(err);
    else
      cont = it.next(res);
    if (!cont.done)
      cont.value(iterate);
  }
  iterate();
}

const mapGen = function * (fn, ary) {
  let rval = [];
  for(let x of ary)
    rval.push(yield fn(x));
  return rval;
}

const forGen = function * (fn, ary) {
  for(let x of ary) {
    yield fn(x);
  }
}


module.exports = exports = {run, mapGen, forGen};
