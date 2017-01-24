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

const digest = data => Crypto.createHash('md5').update(data).digest('hex');
const addDigest = article => R.assoc('digest', digest(article.body), article);
const sourceToArticle = R.compose(addDigest, frontMatter);
const articleToEntry =
  article => R.assoc('digest', article.digest, article.attributes);

module.exports = exports = {sourceToArticle,articleToEntry};
