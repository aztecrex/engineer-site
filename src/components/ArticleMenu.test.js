import React from 'react';
import ArticleMenu from './ArticleMenu';
import ezJson from 'enzyme-to-json';



describe ('render', () => {

  it('renders entries', () => {
    // given
    const directory = [
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
    const rendered = shallow(<ArticleMenu directory={directory} />);

    // then
    expect(ezJson(rendered)).toMatchSnapshot();

  });

  it('renders empty entries', () => {
    // when
    const rendered = shallow(<ArticleMenu directory={[]} />);

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
