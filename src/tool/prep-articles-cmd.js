'use strict';

const FileSystem = require('fs');
const R = require('ramda');
const _ = R.__;
const {run, mapGen, forGen} = require('./genutil');
const {sourceToArticle, articleToEntry} = require('./prep-articles');

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
}

const writeArticle = R.curry(function (dest, article, cb) {
  let path = dest + '/' + article.digest + '.md';
  writefile(path, article.body, cb);
});


const program = function * () {
  const srcDir = 'articles';
  const directoryDestDir = 'src/articles';
  const contentDestDir = 'public/articles';

  let articleFiles = yield readdir(srcDir);
  let articlePaths =
    R.map(name => srcDir + '/' + name, articleFiles);
  let sources = yield * mapGen(readfile,articlePaths);
  let articles = R.map(sourceToArticle, sources);
  let directory = R.map(articleToEntry, articles);

  yield * mkdirIfNotExist(directoryDestDir);
  yield * mkdirIfNotExist(contentDestDir);

  yield * forGen(writeArticle(contentDestDir), articles);

  yield writefile(
    directoryDestDir + '/directory.json', JSON.stringify(directory,null,2));

}
run(program);
