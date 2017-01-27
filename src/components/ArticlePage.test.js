import React from 'react';
const createMockStore = configureMockStore([]);
import ezJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';

import ConnectedArticlePage, {ArticlePage,mapStateToProps} from './ArticlePage';

describe('unconnected', () => {

  it('renders happy', () => {
    // given
    const id = 'article309';
    const title = 'This is SO  Neat';

    // when
    const rendered = shallow(<ArticlePage {...{id,title}} />);

    // then
    expect(ezJson(rendered)).toMatchSnapshot();

  });

  it('shows not found when no id', () =>{

    // when
    const rendered = shallow(<ArticlePage />);

    // then
    expect(ezJson(rendered)).toMatchSnapshot();


  });
});

describe('map state', () => {

  it('maps params id and title', () => {
    // given
    const id = 'brave';
    const title = 'Brave Little Engine';
    const state = {
      articles: {
        index: {
          [id]: {
            title: title
          }
        }
      }
    };

    // when
    const actual = mapStateToProps(state, {params: {id:id}});

    // then
    expect(actual).toEqual({id,title});
  });

  it('missing index entry results in null id', () => {
    // given
    const id = 'brave';
    const state = {
      articles: {
        index: {
          notBrave: {
            title: 'Oh Yeah?'
          }
        }
      }
    };

    // when
    const actual = mapStateToProps(state, {params: {id:id}});

    // then
    expect(actual).toEqual({id:null});

  });

  it('missing index entry results in null id', () => {
    // given
    const state = {
      articles: {
        index: {
          anId: {
            title: 'Does not really matter'
          }
        }
      }
    };

    // when
    const actual = mapStateToProps(state, {params: {}});

    // then
    expect(actual).toEqual({});

  });


});

describe('connected', () => {

  it('is connected to state', () => {
    // given
    const id = 'article4';
    const title = 'Title of Article 4';
    const state = {
      articles: {
        index: {
          [id]: {title}
        }
      }
    };
    const params = {id};
    const store = createMockStore(state);

    // when
    const rendered = shallow(
      <ConnectedArticlePage store={store} params={params} /> );

    // then
    expect(ezJson(rendered)).toMatchSnapshot();

  });

});
