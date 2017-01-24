'use strict';

function run(g) {
  let it = g();

  function iterate(err, res) {
    if (err)
      it.throw(err);
    let cont = it.next(res);
    console.log(cont);
    if (!cont.done)
      cont.value(iterate);
  }
  iterate();
}

function *mapGen(fn, ary) {
  let rval = [];
  for(let x of ary)
    rval.push(yield fn(x));
  return rval;
}

function *forGen(fn, ary) {
  for(let x of ary) {
    yield fn(x);
  }
}


module.exports = exports = {run, mapGen, forGen};
