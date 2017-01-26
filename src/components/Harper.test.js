import React from 'react';
import {Provider} from 'react-redux';
import {mount, shallow, render} from 'enzyme';
import configureMockStore from 'redux-mock-store';
const createMockStore = configureMockStore([]);

import {actions} from '../model';
const {flipName} = actions;

import Harper from './harper';

const makeState = name => {
  return {name: name};
};

const embed = (component, store) => {
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
  let store = createMockStore(state);
  let embedded = embed(Harper, store);

  // when
  let wrapper = render(embedded);

  // then
  let spans = wrapper.find('span');
  expect(spans.length).toBe(1);
  expect(wrapper.text()).toEqual(name);

});

it ('emits a flip name action on click', () => {

  // given
  let state = makeState('Marla');
  let store = createMockStore(state);
  let embedded = embed(Harper, store);
  let wrapper = mount(embedded);

  // when
  wrapper.simulate('click');

  // then
  expect(store.getActions()[0]).toEqual(flipName());


});
