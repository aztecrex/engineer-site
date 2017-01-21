'use strict';

const FrontMatter = require('front-matter');
const FileSystem = require('fs');
const R = require('ramda');
const _ = R.__;
const Async = require('async');
const Crypto = require('crypto');

const articleFiles = R.curryN(2, FileSystem.readdir)('articles');
const loadArticle = (name, cb) =>
  FileSystem.readFile("articles/" + name, "utf-8", cb);
const loadArticles = (names, cb) =>
  Async.map(names, loadArticle, cb);
const hash = data =>
  Crypto.createHash('md5').update(data).digest('hex');
const addPublicFile = a =>
    R.assoc('source', hash(a.body) + '.md', a);
const processArticles =
  Async.asyncify(R.map(R.compose(addPublicFile,FrontMatter)));
const writeArticle = (article, cb) => {
  FileSystem.writeFile("public/article/" + article.source, article.body, cb);
}
const mkdir = R.curryN(3,FileSystem.mkdir)(_, parseInt('0777', 8));
const writePublic = (articles, cb) => {
  Async.series([
    Async.reflect(mkdir('public/article')),
    R.curry(Async.map)(articles, writeArticle)
  ],(err, res) => {
    if (err)
      cb(err);
    else
      cb(null, articles);
  });
};
const clean =
  Async.asyncify(
    R.map(
      a => R.assoc('source', a.source, a.attributes)));

Async.waterfall([
  articleFiles,
  loadArticles,
  processArticles,
  writePublic,
  clean
], (err, res) => {
  console.log("err", err);
  console.log("res", res);
});
