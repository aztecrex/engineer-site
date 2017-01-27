const Crypto = require('crypto');

const {sourceToArticle, articleToEntry} = require('./prep-articles');

it ('converts source to article', () => {
  // given
  let text = 'some\ntext';
  let attributes = {one: 1, two:"two"};
  let source = `---\n${JSON.stringify(attributes)}\n---\n${text}`

  // when
  let actual = sourceToArticle(source);

  // then
  let digest = Crypto.createHash('md5').update(text).digest('hex');

  expect(actual.digest).toEqual(digest);
  expect(actual.body).toEqual(text);
  expect(actual.attributes).toEqual(attributes);

});

it ('converts article to entry', () => {
  // given
  let text = 'some\ntext';
  let attributes = {one: 1, two:"two"};
  let source = `---\n${JSON.stringify(attributes)}\n---\n${text}`
  let article = sourceToArticle(source);

  // when
  let actual = articleToEntry(article);

  // then
  let digest = Crypto.createHash('md5').update(text).digest('hex');

  expect(actual).toEqual({...attributes,digest});

});
