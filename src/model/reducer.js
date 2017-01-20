const defaultState = {
  name: "Harper",
  articles: [
    {
      id: "host-easy",
      name: "Host Easy",
      date: new Date(Date.parse("2017-01-17T15:00-0800"))
    },
    {
      id: "adventures",
      name: "Adventures In Tech Blogging",
      date: new Date(Date.parse("2017-01-15T15:00-0800"))
    }
  ],
  sources: {
    "host-easy": "host-it-on-aws.md",
    "adventures": "this-was-supposed-to-be-easy.md"
  }
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
