'use strict';

const frontMatter = require('front-matter');
const FileSystem = require('fs');
const R = require('ramda');
const _ = R.__;
const Crypto = require('crypto');
const {run, mapGen, forGen} = require('./genutil');

const readdir = R.curryN(2, FileSystem.readdir);
const readfile = R.curryN(3, FileSystem.readFile)(_,"utf-8");
const mkdir = R.curryN(3,FileSystem.mkdir)(_, parseInt('0777', 8));
const writefile = R.curryN(3, FileSystem.writeFile);

const mkdirIfNotExist = function * (path) {
  try {
    yield mkdir(path)
  } catch (err) {
    if (err.code !== 'EEXIST')
      throw err;
    // ok if exists already
  }
  console.log("ok");
}

const writeArticle = R.curry(function (article, cb) {
  let path = 'src/articles/' + article.digest + '.md';
  writefile(path, article.body, cb);
});

const digest = data => Crypto.createHash('md5').update(data).digest('hex');
const addDigest = article => R.assoc('digest', digest(article.body), article);
const toArticle = R.compose(addDigest, frontMatter);
const toEntry = article => R.assoc('digest', article.digest, article.attributes);

const program = function * () {
  const srcDir = 'articles';
  const destDir = 'src/articles';

  let articleFiles = yield readdir(srcDir);
  let articlePaths =
    R.map(name => srcDir + '/' + name, articleFiles);
  let sources = yield * mapGen(readfile,articlePaths);
  let articles = R.map(toArticle, sources);
  let directory = R.map(toEntry, articles);

  yield * mkdirIfNotExist(destDir);

  yield * forGen(writeArticle, articles);

  yield writefile(destDir + '/directory.json', JSON.stringify(directory));

}
// run(program);
