import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ArticleMenu from './ArticleMenu';


const makeState = directory => {
  return {directory};
};

const embed = (component, state) => {
  let createStore = configureMockStore([]);
  let store = createStore(state);
  return (
    <Provider store={store}>
      {React.createElement(component)}
    </Provider>
  );
};

// const earliestFirst = (a1,a2) => a1.published < a2.published?-1:(a2.published < a1.published?-1:0);
describe('rendering', () => {
  it('renders an article as a link', () => {
    // given
    let id = "article-a";
    let title = "Article Title";
    const directory = [
      {
        "id": id,
        "title": title
      }
    ];
    let state = makeState(directory);
    let embedded = embed(ArticleMenu, state);
    // when
    let wrapper = render(embedded);

    // then
    let ul = wrapper.find('ul');
    expect(ul.length).toEqual(1);

    let as = ul.find('li a');
    expect(as.length).toEqual(1);

    let first = as.slice(0).first();
    expect(first.attr('href')).toEqual("article/" + id);
    expect(first.text()).toEqual(title);

  });

  it('renders multiple articles', () => {
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
    let state = makeState(directory);
    let embedded = embed(ArticleMenu, state);

    // when
    let wrapper = render(embedded);

    // then
    let ul = wrapper.find('ul');
    expect(ul.length).toEqual(1);

    let as = ul.find('li a');
    expect(as.length).toEqual(2);

  });


});
