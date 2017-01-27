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
