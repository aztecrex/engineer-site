import React from 'react';
import {shallow} from 'enzyme';

import ArticlePage from './ArticlePage';

it('should display the article id', () => {
  let id = 'article012345';
  let params = {id};
  expect(shallow(<ArticlePage params={params} />).text()).toContain(id);
});
