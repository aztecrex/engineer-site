import R from 'ramda';

const latestFirst =
  R.comparator((entry1,entry2) => entry1.published > entry2.published);

const parsePublished = elem => R.assoc('published', new Date(elem.published), elem);

const prepareEntries = entries =>
  R.map(parsePublished, entries).sort(latestFirst);

const entryToIndex = entry => ({[entry.id]: entry.digest});
const prepareIndex = R.compose(R.mergeAll, R.map(entryToIndex));

const defaultState = entries => ({
  directory: prepareEntries(entries),
  index: prepareIndex(entries)
});

const makeReducer = entries => (state, action) => {
  return state || defaultState(entries);
};

const construct = entries => {
  return {reduce: makeReducer(entries)};
};

export default construct;
