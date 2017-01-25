import R from 'ramda';

import directory from './directory';

describe('state prep', ()  => {
  it('sorts the entries by published time', () => {
    // given
    // note the first and second entries have different lexical and actual order
    let entries = [
      {title:'one', published: '2016-05-01T13:45:21.1Z'},
      {title:'two', published: '2016-05-01T13:45:21.1-0800'},
      {title:'three', published: '2016-05-01T13:45:22-0800'},
      {title:'four', published: '2016-12-04'}
    ];

    // when
    let actual = directory(entries);

    // then
    let titles = R.map(R.prop('title'), actual);
    expect(titles).toEqual(['four','three','two','one']);

  });
  it('changes published from string to date', () => {
    // given
    let published = '2016-05-01T13:45:21.1-0800';
    let entries = [
      {title:'two', published: published}
    ];

    // when
    let actual = directory(entries);

    // then
    let expectedPublished = new Date(published);
    expect(actual[0].published).toEqual(expectedPublished);

  });
});
