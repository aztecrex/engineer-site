const defaultState = {
  name: "Harper",
  articles: [
    {
      id: "adventures-in-tech-blogging",
      name: "Adventures In Tech Blogging",
      date: new Date(Date.parse("2017-01-15"))
    },
    {
      id: "host-easy",
      name: "Host Easy",
      date: new Date(Date.parse("2017-01-17"))
    }
  ]
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
