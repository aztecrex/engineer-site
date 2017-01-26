import React from 'react';
import {shallow} from 'enzyme';

import HomePage from './HomePage';
import ArticleMenu from './ArticleMenu';
import Harper from './Harper';

it ('renders article menu', () => {
  // given
  let elem = (<HomePage />);

  // when
  let wrapper = shallow(elem);

  // then
  expect(wrapper.find(ArticleMenu).length).toBe(1);
});

it ('renders harper', () => {
  // given
  let elem = (<HomePage />);

  // when
  let wrapper = shallow(elem);

  // then
  expect(wrapper.find(Harper).length).toBe(1);
});
