import React from 'react';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ezJson from 'enzyme-to-json';
import Article from './Article';

const createMockStore = configureMockStore([]);


describe('render article', () => {
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
