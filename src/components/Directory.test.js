import React from 'react';
import ezJson from 'enzyme-to-json';
import {Directory} from './Directory';

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
