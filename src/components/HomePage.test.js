import React from 'react';
import ezJson from 'enzyme-to-json';

import HomePage from './HomePage';

describe('render', () => {

  it ('renders', () => {

    // when
    let rendered = shallow(<HomePage />);

    // then
    expect(ezJson(rendered)).toMatchSnapshot();
  });


});
