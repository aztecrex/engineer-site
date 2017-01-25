import entries from '../articles/directory.json';
import makeArticles from './articles';

const defaultState = {
  name: "Harper",
  directory: makeArticles(entries).reduce().directory // not the correct way yet
};

const reduce = (state = defaultState, action) => {

  let newState;
  switch (action.type) {
    case 'FLIP_NAME':
      newState = {
        ...state,
        name: state.name.split('').reverse().join('')
      };
      break;
    default:
      newState = state;
      break;
  }
  return newState;
};

export { reduce };
