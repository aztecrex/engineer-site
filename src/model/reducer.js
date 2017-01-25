import entries from '../articles/directory.json';
import directory from './directory';

const defaultState = {
  name: "Harper",
  directory: directory(entries)
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
