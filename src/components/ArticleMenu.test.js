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

// describe('rendering', () => {
//   it('renders an article as a link', () => {
//     // given
//     let id = "article-a";
//     let title = "Article Title";
//     const directory = [
//       {
//         "id": id,
//         "title": title
//       }
//     ];
//     let state = makeState(directory);
//     let embedded = embed(ArticleMenu, state);
//     // when
//     let wrapper = mount(embedded);
//
//     // then
//     let links = wrapper.find(Link);
//     expect(links.length).toBe(1);
//     expect(links.first().text()).toEqual(title);
//     expect(links.prop('to')).toEqual('article/' + id);
//
//   });
//
//   it('renders multiple articles', () => {
//     // given
//     const directory = [
//       {
//         "id": "one",
//         "title": "One"
//       },
//       {
//         "id": "two",
//         "title": "Two"
//       }
//     ];
//     let state = makeState(directory);
//     let embedded = embed(ArticleMenu, state);
//
//     // when
//     let wrapper = mount(embedded);
//
//     // then
//     let links = wrapper.find(Link);
//     expect(links.length).toBe(2);
//
//   });
//
//   it('renders empty list if directory missing', () => {
//     // given
//     let state = {articles:{}};
//     let embedded = embed(ArticleMenu, state);
//
//     // when
//     let wrapper = render(embedded);
//
//     // then
//     let ul = wrapper.find('ul');
//     expect(ul.length).toEqual(1);
//
//     let as = ul.find('li a');
//     expect(as.length).toEqual(0);
//   });
//
//   it('renders empty list if articles missing', () => {
//     // given
//     let state = {};
//     let embedded = embed(ArticleMenu, state);
//
//     // when
//     let wrapper = render(embedded);
//
//     // then
//     let ul = wrapper.find('ul');
//     expect(ul.length).toEqual(1);
//
//     let as = ul.find('li a');
//     expect(as.length).toEqual(0);
//   });
// });
