import React from 'react';
import {shallow} from 'enzyme';

import Article from './Article';

describe('render article', () => {

  it('renders as a div', () => {

    // given
    let article = (<Article />);

    // when
    let wrapper = shallow(article);

    // then
    expect(wrapper.is('div')).toBe(true);

  });

});
