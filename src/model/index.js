import {
  createStore,
  combineReducers
} from 'redux';
import R from 'ramda';

/* - Submodule Delegation ----------------------
*/

// articles
import {
  createReducer as createArticlesReducer,
  actions as articlesActions
} from './articles';
import directoryEntries from '../articles/directory.json';
const reduceArticles = createArticlesReducer(directoryEntries);

// nostalgia
import {
  reduce as reduceHarper,
  actions as harperActions
} from './harper';

/* - Composition --------------------------------
*/
// combine the reducers
const reduce = combineReducers(
  {
    articles: reduceArticles,
    name: reduceHarper
  }
);

// combine the actions
const actions = R.mergeAll([articlesActions, harperActions]);

/* - Export --------------------------------------
*/
const store = createStore(reduce);
export { actions, store };
