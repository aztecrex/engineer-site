const flipNameType = 'HARPER_FLIP_NAME';

const flipName = () => ({
  type: flipNameType
});

const reduce = (state = "Harper", action) => {

  let newState;
  if (action) {
    switch (action.type) {
      case flipNameType:
        newState = state.split('').reverse().join('');
        break;
      default:
        newState = state;
        break;
    }
  } else newState = state;

  return newState;
};

const actions = {flipName};

export { reduce, actions };
