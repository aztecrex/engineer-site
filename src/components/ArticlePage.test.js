import React from 'react';
import ezJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';

import ConnectedArticlePage, {ArticlePage,mapStateToProps} from './ArticlePage';

describe('render unconnected', () => {

  it('renders', () => {
    // given
    const id = 'article309';
    const title = 'This is SO  Neat';

    // when
    const rendered = shallow(<ArticlePage {...{id,title}} />);

    // then
    expect(ezJson(rendered)).toMatchSnapshot();

  });
});

describe.only('map state', () => {

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

});


// const id = 'article012345';
// const digest = 'digest-for-article-012345';
// const state = {
//   articles: {
//     index: {
//       [id]: {
//         digest
//       }
//     }
//   }
// };
// const createMockStore = configureMockStore([]);
//
// it('should display the article id', () => {
//
//   const store = createMockStore(state);
//   const params = {id};
//   const embedded = (
//     <Provider store={store}>
//       <ArticlePage params={params} />
//     </Provider>
//   );
//
//   expect(mount(embedded).find(ArticlePage).text()).toContain(id);
//   expect(mount(embedded).find(ArticlePage).text()).toContain(digest);
// });
//
// it('should emit request for missing content', () => {
//   const store = createMockStore(state);
//   const params = {id};
//   const embedded = (
//     <Provider store={store}>
//       <ArticlePage params={params} />
//     </Provider>
//   );
//
//   mount(embedded);
//
//   expect(store.getActions()[0]).toEqual(needContent(digest));
//
// });
