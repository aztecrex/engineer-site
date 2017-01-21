'use strict';

const FrontMatter = require('front-matter');
const FileSystem = require('fs');
const R = require('ramda');
const Async = require('async');
const Crypto = require('crypto');

const files = R.curryN(2, FileSystem.readdir)('articles');
const loadArticle = (name, cb) =>
  FileSystem.readFile("articles/" + name, "utf-8", cb);
const load = (names, cb) =>
  Async.map(names, loadArticle, cb);
const hash = data =>
  Crypto.createHash('md5').update(data).digest('hex');
const addPublicFile = a =>
    R.assoc('source', hash(a.body) + '.md', a);
const interpret =
  Async.asyncify(R.map(R.compose(addPublicFile,FrontMatter)));
const writeArticle = (article, cb) => {
  console.log(article.source);
  console.log(article.body);
  FileSystem.writeFile("public/" + article.source, article.body, cb);
}
const write = (articles, cb) => {
  Async.map(articles, writeArticle, (err, res) => {
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
  files,
  load,
  interpret,
  write,
  clean
], (err, res) => {
  console.log("err", err);
  console.log("res", res);
});
