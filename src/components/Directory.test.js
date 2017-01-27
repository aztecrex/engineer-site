import React from 'react';
import ezJson from 'enzyme-to-json';
import {Directory, mapStateToProps} from './Directory';

describe('unconnected', () => {
  it('renders', () => {
    // given
    const entries = [
      {id:'one',
      title:'One'}
    ];
    // when
    const rendered = shallow(<Directory entries={entries} />);

    //then
    expect(ezJson(rendered)).toMatchSnapshot();
  });
});

describe('map state', () => {

  it('sorts entries intact', () => {
    //given
    const entries = [
      {title:'three', published: new Date('2016-05-01T13:45:22-0800')},
      {title:'one', published: new Date('2016-05-01T13:45:21.1Z')},
      {title:'two', published: new Date('2016-05-01T13:45:21.1-0800')},
      {title:'four', published: new Date('2016-12-04')}
    ];
    const state = {articles:{directory:entries}};

    // when
    const actual = mapStateToProps(state);

    // then
    const expectedEntries = [
      {title:'four', published: new Date('2016-12-04')},
      {title:'three', published: new Date('2016-05-01T13:45:22-0800')},
      {title:'two', published: new Date('2016-05-01T13:45:21.1-0800')},
      {title:'one', published: new Date('2016-05-01T13:45:21.1Z')}
    ];
    expect(actual).toEqual({directory:expectedEntries});




  });

});


// const prepareEntries = entries =>
//   R.map(parsePublished, entries).sort(latestFirst);
// it('sorts the entries by published time', () => {
//   // given
//   // note the first and second entries have different lexical and actual order
//   let reduce = createReducer(entries);
//
//   // when
//   let actual = reduce().directory;
//
//   // then
//   let titles = R.map(R.prop('title'), actual);
//   expect(titles).toEqual(['four','three','two','one']);
//
// });
