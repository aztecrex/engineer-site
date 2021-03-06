import R from 'ramda';

import {
  createReducer,
  actions
} from './articles';

const {receiveContent} = actions;

describe('initial directory', ()  => {

  it('changes published from string to date', () => {
    // given
    let published = '2016-05-01T13:45:21.1-0800';
    let entries = [
      {title:'two', published: published}
    ];
    let reduce = createReducer(entries);

    // when
    let actual = reduce().directory;

    // then
    let expectedPublished = new Date(published);
    expect(actual[0].published).toEqual(expectedPublished);

  });
});

describe('initial index', () => {
  it('creates an index entry with article ref for each source entry', () => {
    // given
    // note the first and second entries have different lexical and actual order
    let id1 = 'one';
    let article1 = {published: '2016-05-01', id: id1, digest: "digest-1"};
    let id2 = 'two';
    let article2 = {published: '2016-05-02', id: id2, digest: "digest-2"};

    let entries = [article1, article2];
    let reduce = createReducer(entries);

    // when
    let actual = reduce().index;

    // then
    let expected = {[id1]: article1,[id2]: article2};
    expect(actual).toEqual(expected);

  });

});

describe('initial content', () => {
  it('creates an empty content entry', () => {
    // given
    let entries = [{published: '2016-05-01', id: "one", digest: "digest-1"}];
    let reduce = createReducer(entries);

    // when
    let actual = reduce().content;

    // then
    expect(actual).toEqual({});
  });
});

describe ('action constructors', () => {

  it('makes a receive content action', () => {

    // given
    let digest = "content-digest";
    let content = "<p>content</p>";

    // when
    let actual = receiveContent(digest, content);

    // then
    let expected = {
      type: 'ARTICLES_RECEIVE_CONTENT',
      digest: digest,
      content: content
    };
    expect(actual).toEqual(expected);
  });
});

describe ('reducer', () => {
  let id1 = 'one';
  let digest1 = 'd-one';
  let id2 = 'two';
  let digest2 = 'd-two';
  let entries = [
    {published: '2016-05-01', id: id1, digest: digest1},
    {published: '2016-05-02', id: id2, digest: digest2}
  ];
  let reduce = createReducer(entries);
  let initialState = reduce();
  it('reduce updates with received content', () => {
    // given
    let content = '<p>here is your new content';

    // when
    let actual = reduce(initialState, receiveContent(digest1, content));

    // then
    // directory is untouched
    expect(actual.directory).toEqual(initialState.directory);
    // index is untouched
    expect(actual.index).toEqual(initialState.index);

    let expectedContent = {[digest1]:content};
    expect(actual.content).toEqual(expectedContent);

  });

});
