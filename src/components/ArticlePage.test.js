import React from 'react';
import {shallow, mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import {actions} from '../model';
const {needContent} = actions;

import ArticlePage from './ArticlePage';

const id = 'article012345';
const digest = 'digest-for-article-012345';
const state = {
  articles: {
    index: {
      [id]: {
        digest
      }
    }
  }
};
const createMockStore = configureMockStore([]);

it('should display the article id', () => {

  const store = createMockStore(state);
  const params = {id};
  const embedded = (
    <Provider store={store}>
      <ArticlePage params={params} />
    </Provider>
  );

  expect(mount(embedded).find(ArticlePage).text()).toContain(id);
  expect(mount(embedded).find(ArticlePage).text()).toContain(digest);
});

it('should emit request for missing content', () => {
  const store = createMockStore(state);
  const params = {id};
  const embedded = (
    <Provider store={store}>
      <ArticlePage params={params} />
    </Provider>
  );

  mount(embedded);

  expect(store.getActions()[0]).toEqual(needContent(digest));

});
