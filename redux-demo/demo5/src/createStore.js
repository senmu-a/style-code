export default function CreateStore(reducer, initState) {
  let state = initState;
  const listeners = [];

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  function replaceReducer(nextReducer) {
    reducer = nextReducer;
    // 以前的 reducer 全部被重写
    dispatch({ type: Symbol() });
  }

  function dispatch(action) {
    state = reducer(state, action);
    for (const listener of listeners) {
      listener();
    }
  }

  dispatch({ type: Symbol() })

  return {
    replaceReducer,
    subscribe,
    getState,
    dispatch
  }
}