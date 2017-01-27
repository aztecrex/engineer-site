import React from 'react';
import ArticleMenu from './ArticleMenu';
import ezJson from 'enzyme-to-json';



describe ('render', () => {

  it('renders entries', () => {
    // given
    const entries = [
      {
        "id": "one",
        "title": "One"
      },
      {
        "id": "two",
        "title": "Two"
      }
    ];

    // when
    const rendered = shallow(<ArticleMenu entries={entries} />);

    // then
    expect(ezJson(rendered)).toMatchSnapshot();

  });

  it('renders empty entries', () => {
    // when
    const rendered = shallow(<ArticleMenu entries={[]} />);

    // then
    expect(ezJson(rendered)).toMatchSnapshot();

  });

  it('renders missing entries', () => {
    // when
    const rendered = shallow(<ArticleMenu />);

    // then
    expect(ezJson(rendered)).toMatchSnapshot();

  });


});
