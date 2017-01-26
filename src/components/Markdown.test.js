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

  const content =
`# Title

This paragraph says everything.

* one
  * one point one
* two
`;

  // when
  const rendered = shallow(<ArticleContent content={content} />);

  // then
  expect(ezJson(rendered)).toMatchSnapshot();
});
