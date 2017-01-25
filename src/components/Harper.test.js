import React from 'react';
import {Provider} from 'react-redux';
import {shallow, render} from 'enzyme';
import configureMockStore from 'redux-mock-store';
const createMockStore = configureMockStore([]);

import Harper from './harper';

const makeState = name => {
  return {name: name};
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


it ('renders name in a span', () => {
  // given
  let name = 'Charles';
  let state = makeState(name);
  let embedded = embed(Harper, state);

  // when
  let wrapper = render(embedded);

  // then
  let spans = wrapper.find('span');
  expect(spans.length).toBe(1);
  expect(wrapper.text()).toEqual(name);

});
