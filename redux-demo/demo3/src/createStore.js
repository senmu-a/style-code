export default function CreateStore(reducer, initState) {
  let state = initState;
  const listeners = [];

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  function dispatch(action) {
    state = reducer(state, action);
    for (const listener of listeners) {
      listener();
    }
  }

  return {
    subscribe,
    getState,
    dispatch
  }
}