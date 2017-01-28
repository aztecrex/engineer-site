import React from 'react';
import ezJson from 'enzyme-to-json';

import Revision from './Revision';

describe('render', () => {
  it('renders', () => {
    // when
    const rendered = shallow(<Revision />);

    //then
    expect(ezJson(rendered)).toMatchSnapshot();
  });
});
