import React from 'react';
import configureMockStore from 'redux-mock-store';
const createMockStore = configureMockStore([]);
import ezJson from 'enzyme-to-json';

import {LatestArticle,mapStateToProps} from './LatestArticle';

describe('unconnected', () => {
  it ('renders', () => {

    // given
    const id = 'article883';

    // when
    const rendered = shallow(<LatestArticle id={id} />);

    // then
    expect(ezJson(rendered)).toMatchSnapshot();

  });
});

describe('map state', () => {
  it('finds latest', () => {

    // given
    const entries = [
      {id:'three', published: new Date('2016-05-01T13:45:22-0800')},
      {id:'one', published: new Date('2016-05-01T13:45:21.1Z')},
      {id:'two', published: new Date('2016-05-01T13:45:21.1-0800')},
      {id:'four', published: new Date('2016-12-04')}
    ];
    const state = {articles:{directory:entries}};

    // when
    const actual = mapStateToProps(state);

    // then
    expect(actual).toEqual({id:'four'});


  });
});
