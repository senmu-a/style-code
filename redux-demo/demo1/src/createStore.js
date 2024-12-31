export default function CreateStore(initState) {
  let state = initState;
  const listeners = [];

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  function changeState(newState) {
    state = newState;
    for (const listener of listeners) {
      listener();
    }
  }

  return {
    subscribe,
    getState,
    changeState
  }
}