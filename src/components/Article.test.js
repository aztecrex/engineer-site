import React from 'react';
import configureMockStore from 'redux-mock-store';
const createMockStore = configureMockStore([]);
import ezJson from 'enzyme-to-json';

import {actions} from '../model';
import ConnectedArticle, {Article, mapStateToProps} from './Article';


describe('wiring', () => {
  it('maps missing digest to empty', () => {
      // given
      const id = 'id101';
      const state = {};

      // when
      const actual = mapStateToProps(state, {id});

      // then
      expect(actual).toEqual({});

  });

  it('maps missing id to empty', () => {

      // when
      const actual = mapStateToProps({articles:{index:{}}});

      // then
      expect(actual).toEqual({});

  });

  it('maps digest', () => {
      // given
      const id = 'id103';
      const digest = 'digest103';
      const index = {[id]:{digest}};
      const state = {articles: {index}};

      // when
      const actual = mapStateToProps(state, {id});

      // then
      expect(actual).toEqual({digest});

  });

  it('maps content', () => {
      // given
      const id = 'id103';
      const digest = 'digest103';
      const content = 'cow dance';

      const index = {[id]:{digest}};
      const cache = {[digest]:content};
      const state = {articles: {index, content:cache}};

      // when
      const actual = mapStateToProps(state, {id});

      // then
      expect(actual).toEqual({digest,content});

  });
});

describe('unconnected', () => {

  it('renders without props', () => {

    // when
    const rendered = shallow(<Article />);

    // then
    expect(ezJson(rendered)).toMatchSnapshot();

  });

  it('renders with only digest', () => {

    // when
    const rendered = shallow(<Article digest="dig123" />);

    // then
    expect(ezJson(rendered)).toMatchSnapshot();

  });

  it('renders with digest and content', () => {

    // when
    const rendered = shallow(<Article digest="dig123" content="the content" />);

    // then
    expect(ezJson(rendered)).toMatchSnapshot();

  });

  it('renders with only content', () => {

    // when
    const rendered = shallow(<Article content="the content" />);

    // then
    expect(ezJson(rendered)).toMatchSnapshot();

  });


});

describe('connected', () => {

  it('gets mapped state', () => {
    // given
    const id = 'art3';
    const digest = 'dig3';

    const state = {
      articles: {
        index: {[id]:{digest}},
        content:{[digest]:'some content'}
    }};
    const store = createMockStore(state);

    // when
    const rendered = shallow(<ConnectedArticle store={store} id={id} /> );

    // then
    expect(ezJson(rendered)).toMatchSnapshot();

  });

  it('emits when content not found', () => {
    // given
    const id = 'article3';
    const digest = 'the-digest';
    const state = {
      articles: {
        index: {
          [id]: {
            digest: digest
          }
        }
      }
    };
    const store = createMockStore(state);

    // when
    const rendered = mount(<ConnectedArticle store={store} id={id} /> );

    // then
    expect(store.getActions().length).toEqual(1);
    expect(store.getActions()[0]).toEqual(actions.needContent(digest));

  });

  it('does not emit when digest not found', () => {
    // given
    const id = 'article3';
    const state = {};
    const store = createMockStore(state);

    // when
    const rendered = mount(<ConnectedArticle store={store} id={id} /> );

    // then
    expect(store.getActions().length).toEqual(0);

  });


  it('does not emit when content found', () => {
    // given
    const id = 'article3';
    const digest = 'the-digest';
    const state = {
      articles: {
        index: {
          [id]: {
            digest: digest
          }
        },
        content: {
          [digest]: 'the content you need'
        }
      }
    };
    const store = createMockStore(state);

    // when
    const rendered = mount(<ConnectedArticle store={store} id={id} /> );

    // then
    expect(store.getActions().length).toEqual(0);

  });

});
