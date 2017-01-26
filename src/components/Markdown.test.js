import React from 'react';
import ezJson from 'enzyme-to-json';
import ArticleContent from './Markdown';

it('should render with no content', () => {

  // when
  const rendered = shallow(<ArticleContent />);

  // then
  expect(ezJson(rendered)).toMatchSnapshot();
});

it('should render html from markdown', () => {

  const source =
`# Title

This paragraph says everything.

* one
  * one point one
* two
`;

  // when
  const rendered = shallow(<ArticleContent source={source} />);

  // then
  expect(ezJson(rendered)).toMatchSnapshot();
});
