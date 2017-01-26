import React from 'react';
import configureMockStore from 'redux-mock-store';
const createMockStore = configureMockStore([]);
import ezJson from 'enzyme-to-json';

import {actions} from '../model';
import ConnectedArticle, {Article, mapStateToProps} from './Article';


describe('wiring', () => {
  it('maps empty to empty index and content', () => {
      // given
      const state = {};

      // when
      const actual = mapStateToProps(state);

      // then
      const expected = {
        index: {},
        content: {}
      };
      expect(actual).toEqual(expected);

  });

  it('maps undefined to empty index and content', () => {
      // given

      // when
      const actual = mapStateToProps();

      // then
      const expected = {
        index: {},
        content: {}
      };
      expect(actual).toEqual(expected);

  });

  it('maps index and content', () => {
      // given
      const index = {some:"stuff"};
      const content = {addl:"things"};
      const state = {
        articles: {
          index: index,
          content: content
        }
      };

      // when
      const actual = mapStateToProps(state);

      // then
      const expected = {index,content};
      expect(actual).toEqual(expected);

  });

  it('ignores everything else', () => {
    // given
    const state = {just: "noise"};

    // when
    const actual = mapStateToProps(state);

    // then
    const expected = {
      index: {},
      content: {}
    };
    expect(actual).toEqual(expected);

  });


});

describe('render unconnected', () => {

  it('renders id not found', () => {

    // given
    const id = 'article3';
    const props = mapStateToProps({});

    // when
    const rendered = shallow(<Article {...props} id={id} />);

    // then
    expect(ezJson(rendered)).toMatchSnapshot();

  });

  it('renders content not found', () =>  {

    // given
    const id = 'article3';
    const props = mapStateToProps({
      articles: {
        index: {
          [id]: {
            digest: 'the-digest'
          }
        }
      }
    });

    // when
    const rendered = shallow(<Article {...props} id={id} />);

    // then
    expect(ezJson(rendered)).toMatchSnapshot();

  });

  it('renders content found', () =>  {

    // given
    const id = 'article3';
    const digest = 'the-digest';
    const props = mapStateToProps({
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
    });

    // when
    const rendered = shallow(<Article {...props} id={id} />);

    // then
    expect(ezJson(rendered)).toMatchSnapshot();


  });

});

describe('connected article', () => {

  it('is connected to state', () => {
    // given
    const state = {articles: {
      index: {id1: "here is the index"},
      content:{digest2: "here is the content"}
    }};
    const store = createMockStore(state);

    // when
    const rendered = shallow(<ConnectedArticle store={store} /> );

    // then
    expect(ezJson(rendered)).toMatchSnapshot();

  });

  it('emits when content not found', () => {
    // given
    const id = 'article3';
    const state = {
      articles: {
        index: {
          [id]: {
            digest: 'the-digest'
          }
        }
      }
    };
    const store = createMockStore(state);

    // when
    const rendered = mount(<ConnectedArticle store={store} id={id} /> );

    // then
    expect(store.getActions().length).toEqual(1);
    expect(store.getActions()[0]).toEqual(actions.needContent());

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
