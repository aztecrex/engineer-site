import React from 'react';
import configureMockStore from 'redux-mock-store';
const createMockStore = configureMockStore([]);
import ezJson from 'enzyme-to-json';

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

describe.skip('render article', () => {
  const id = 'article0001';
  const digest = 'd-article-0001';

  const wire = state => {
    const store = createMockStore(state);
    return (
        <Article id={id} store={store} />
    );
  };

  it('renders id not found', () => {

    // given
    const state = {};
    const wired = wire(state);

    // when
    const rendered = shallow(wired);

    // then
    expect(ezJson(rendered)).toMatchSnapshot();

  });

  it('renders content not found', () =>  {

    // given
    const state = {
      articles: {
        index: {
          [id]: {
            digest: digest
          }
        }
      }
    };
    const wired = wire(state);

    // when
    const rendered = shallow(wired);

    // then
    expect(ezJson(rendered)).toMatchSnapshot();


  });

  it('renders content found', () =>  {

    // given
    const state = {
      articles: {
        index: {
          [id]: {
            digest: digest
          }
        },
        content: {
          [digest]: 'you only live twice'
        }
      }
    };
    const wired = wire(state);

    // when
    const rendered = shallow(wired);

    // then
    expect(ezJson(rendered)).toMatchSnapshot();


  });

});
