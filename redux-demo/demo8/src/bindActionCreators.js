
function bindActionCreator(actionCreator, dispatch) {
  return function() {
    return dispatch(actionCreator.apply(this, arguments));
  }
}

/**
 * 将 actionCreators 映射为 { increment: () => dispatch({ type: 'INCREMENT' }), ...}
 * @param {*} actionCreators { increment: () => { type: 'INCREMENT' }, decrement: () => { type: 'DECREMENT' }, ...}
 * @param {*} dispatch 
 */
const bindActionCreators = (actionCreators, dispatch) => {
  const boundActionCreators = {};
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

export default bindActionCreators;