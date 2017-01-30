import React from 'react';
import ezJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
const createMockStore = configureMockStore([]);

import {actions} from '../model';
const {flipName} = actions;

import ConnectedHarper, {Harper, mapStateToProps} from './Harper';

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

describe('connected', () => {

  it('renders mapped state', () => {

    // given
    const state = {name:'Lena'};
    const store = createMockStore(state);

    // when
    const rendered = shallow(<ConnectedHarper store={store} />);

    // then
    expect(ezJson(rendered)).toMatchSnapshot();


  });

  it('issues action on click', () => {

    // given
    const store = createMockStore({});
    const rendered = mount(<ConnectedHarper store={store} />);

    // when
    rendered.simulate('click');

    // then
    expect(store.getActions().length).toEqual(1);
    expect(store.getActions()[0]).toEqual(flipName());

  });

});
