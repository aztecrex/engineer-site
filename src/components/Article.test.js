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

describe('render unconnected', () => {

  it('renders id not found', () => {

    // given
    const id = 'article3';
    const props = mapStateToProps({});

    // when
    const rendered =
      shallow(<Article
        id={id}
        index={props.index}
        content={props.content} />);

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
    const rendered =
      shallow(<Article
        id={id}
        index={props.index}
        content={props.content} />);

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
    const rendered =
      shallow(<Article
        id={id}
        index={props.index}
        content={props.content} />);

    // then
    expect(ezJson(rendered)).toMatchSnapshot();


  });

});
