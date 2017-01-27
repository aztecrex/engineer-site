import React from 'react';
import ezJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
const createMockStore = configureMockStore([]);

import {actions} from '../model';
const {flipName} = actions;

import ConnectedHarper, {Harper, mapStateToProps} from './harper';

describe('unconnected', () => {
  it('renders happy', () => {

    // when
    const rendered = shallow(<Harper name='George' />);

    // then
    expect(ezJson(rendered)).toMatchSnapshot();

  });

  it ('renders missing', () => {

    // when
    const rendered = shallow(<Harper />);

    // then
    expect(ezJson(rendered)).toMatchSnapshot();

  });
});

describe('map state', () => {

  it('extracts name only', () => {
    // given
    const state = {name:'Nancy', extra:'stuff'};

    // when
    const actual = mapStateToProps(state);

    // then
    expect(actual).toEqual({name:'Nancy'});

  });

  it('is ok with missing prop', () => {
    // given
    const state = {extra:'stuff'};

    // when
    const actual = mapStateToProps(state);

    // then
    expect(actual).toEqual({name:''});

  });

  it('is ok with missing state', () => {

    // when
    const actual = mapStateToProps();

    // then
    expect(actual).toEqual({name:''});

  });
});



// const makeState = name => {
//   return {name: name};
// };
//
// const embed = (component, store) => {
//   return (
//     <Provider store={store}>
//       {React.createElement(component)}
//     </Provider>
//   );
// };
//
//
// it ('renders name in a span', () => {
//   // given
//   let name = 'Charles';
//   let state = makeState(name);
//   let store = createMockStore(state);
//   let embedded = embed(Harper, store);
//
//   // when
//   let wrapper = render(embedded);
//
//   // then
//   let spans = wrapper.find('span');
//   expect(spans.length).toBe(1);
//   expect(wrapper.text()).toEqual(name);
//
// });
//
// it ('emits a flip name action on click', () => {
//
//   // given
//   let state = makeState('Marla');
//   let store = createMockStore(state);
//   let embedded = embed(Harper, store);
//   let wrapper = mount(embedded);
//
//   // when
//   wrapper.simulate('click');
//
//   // then
//   expect(store.getActions()[0]).toEqual(flipName());
//
//
// });
