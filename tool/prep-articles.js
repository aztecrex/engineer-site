'use strict';

const FrontMatter = require('front-matter');
const FileSystem = require('fs');
const R = require('ramda');
const _ = R.__;
const Crypto = require('crypto');
const {run, mapGen, forGen} = require('./genutil');

const readdir = R.curryN(2, FileSystem.readdir);
const readfile = R.curryN(3, FileSystem.readFile)(_,"utf-8");
const mkdir = R.curryN(3,FileSystem.mkdir)(_, parseInt('0777', 8));
const writefile = R.curryN(3, FileSystem.writeFile);

function * mkdirIfNotExist(path) {
  try {
    yield mkdir(path);
  } catch (x) {
    if (x.code !== 'EEXIST')
      throw x;
    console.log('huh');
    // OK if directory exists
  }
}

const writeArticle = R.curry(function (article, cb) {
  let path = 'src/articles/' + article.digest + '.md';
  writefile(path, article.body, cb);
});

const digest = data => Crypto.createHash('md5').update(data).digest('hex');
const addDigest = article => R.assoc('digest', digest(article.body), article);
const toArticle = R.compose(addDigest, FrontMatter);
const toEntry = article => R.assoc('digest', article.digest, article.attributes);

function * program() {
  let articleFiles = yield readdir('articles');
  let articlePaths =
    R.map(name => 'articles/' + name, articleFiles);
  let sources = yield * mapGen(readfile,articlePaths);
  let articles = R.map(toArticle, sources);
  let directory = R.map(toEntry, articles);

  yield * mkdirIfNotExist("src/articles");
  yield * forGen(writeArticle, articles);

  yield writefile('src/articles/directory.json', JSON.stringify(directory));

  console.log(directory);


  // CAN SOMETHING LIKE ^^^ WORK?

  // let articles = [];
  // for(let path of articlePaths) {
  //   let article = yield readfile(path);
  //   articles.push(article);
  // }
  // console.log("articles",articles);
}
run(program);

//
// const articleFiles = R.curryN(2, FileSystem.readdir)('articles');
// const loadArticle = (name, cb) =>
//   FileSystem.readFile("articles/" + name, "utf-8", cb);
// const loadArticles = (names, cb) =>
//   Async.map(names, loadArticle, cb);
// const hash = data =>
//   Crypto.createHash('md5').update(data).digest('hex');
// const addPublicFile = a =>
//     R.assoc('source', hash(a.body) + '.md', a);
// const processArticles =
//   Async.asyncify(R.map(R.compose(addPublicFile,FrontMatter)));
// const writeArticle = (article, cb) => {
//   FileSystem.writeFile("public/article/" + article.source, article.body, cb);
// }
// const mkdir = R.curryN(3,FileSystem.mkdir)(_, parseInt('0777', 8));
// const writePublic = (articles, cb) => {
//   Async.series([
//     Async.reflect(mkdir('public/article')),
//     R.curry(Async.map)(articles, writeArticle)
//   ],(err, res) => {
//     if (err)
//       cb(err);
//     else
//       cb(null, articles);
//   });
// };
// const clean =
//   Async.asyncify(
//     R.map(
//       a => R.assoc('source', a.source, a.attributes)));
//
// Async.waterfall([
//   articleFiles,
//   loadArticles,
//   processArticles,
//   writePublic,
//   clean
// ], (err, res) => {
//   console.log("err", err);
//   console.log("res", res);
// });
