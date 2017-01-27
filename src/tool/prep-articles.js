'use strict';

const frontMatter = require('front-matter');
const FileSystem = require('fs');
const R = require('ramda');
const Crypto = require('crypto');
const {run, mapGen, forGen} = require('./genutil');

const digest = data => Crypto.createHash('md5').update(data).digest('hex');
const addDigest = article => R.assoc('digest', digest(article.body), article);
const sourceToArticle = R.compose(addDigest, frontMatter);
const articleToEntry =
  article => R.assoc('digest', article.digest, article.attributes);

module.exports = exports = {
  sourceToArticle,
  articleToEntry
};
