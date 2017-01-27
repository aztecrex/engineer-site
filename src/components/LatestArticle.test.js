import React from 'react';
import configureMockStore from 'redux-mock-store';
const createMockStore = configureMockStore([]);
import ezJson from 'enzyme-to-json';

import {LatestArticle} from './LatestArticle';

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
