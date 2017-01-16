const defaultState = {name: "Harper"};

const reduce = (state = defaultState, action) => {

  console.log("old state", state);
  let newState = {womp:"not really a state"}
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
  console.log("new state", newState);
  return newState;
};

export { reduce };
