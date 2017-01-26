import R from 'ramda';

const receiveContentType = 'ARTICLES_RECEIVE_CONTENT';

const latestFirst =
  R.comparator((entry1,entry2) => entry1.published > entry2.published);

const parsePublished = elem => R.assoc('published', new Date(elem.published), elem);

const prepareEntries = entries =>
  R.map(parsePublished, entries).sort(latestFirst);

const entryToIndex = entry => ({[entry.id]: entry});
const prepareIndex = R.compose(R.mergeAll, R.map(entryToIndex));

const defaultState = entries => ({
  directory: prepareEntries(entries),
  index: prepareIndex(entries),
  content: {}
});

const createReducer = entries => (state = defaultState(entries), action) => {
  let newState;
  if (action) {
    switch(action.type) {
      case receiveContentType:
        let lens = R.lensPath(['content',action.digest]);
        newState = R.set(lens, action.content, state);
        break;
      default:
        newState = state;
        break;
    }
  } else newState = state;
  return newState;
};

const receiveContent = (digest, content) => {
  return {
    type: receiveContentType,
    digest: digest,
    content: content
  };
};

const actions = {
  receiveContent
};

export {
  createReducer,
  actions
};
