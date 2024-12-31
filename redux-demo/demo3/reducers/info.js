let initState = {
  name: '森木',
  description: '冲冲冲！！',
};

export default function infoReducer(state, action) {
  if (!state) {
    state = initState;
  }
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name,
      };
    case 'SET_DECREMENT':
      return {
        ...state,
        description: action.description,
      };
    default:
      return state;
  }
}