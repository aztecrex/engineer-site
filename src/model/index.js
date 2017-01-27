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


/* - temporary saga stuff
*/
// temporarily put saga stuff here while prototyping
import {applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects'
import fetchArticle from '../services/fetch-article';
// import {actions} from './model';
const {receiveContent} = actions;

const fetchContent = function * (action) {
  try {
    const content = yield call(fetchArticle, action.digest);
    yield put(receiveContent(action.digest, content));
  } catch (err) {
    // do nothing while prototyping
    console.log("error fetching content", err);
  }
};

const saga = function * () {
  yield takeEvery("ARTICLES_NEED_CONTENT", fetchContent);
};

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
  reduce,
  applyMiddleware(sagaMiddleware)
)

// then run the saga
sagaMiddleware.run(saga)




/* - Export --------------------------------------
*/
// temporarily remove -- const store = createStore(reduce);
export { actions, store };
