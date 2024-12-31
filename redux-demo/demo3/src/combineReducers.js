export default function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);
  return function combine(state = {}, action) {
    const nextState = {};
    for (let index = 0; index < reducerKeys.length; index++) {
      const key = reducerKeys[index];
      const reducer = reducers[key];

      const previousStateForkey = state[key];
      const nextStateForkey = reducer(previousStateForkey, action);
      nextState[key] = nextStateForkey;
    }
    return nextState;
  }
}