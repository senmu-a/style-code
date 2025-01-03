const loggerMiddleware = (store) => (next) => (action) => {
  console.log('oldState', store.getState());
  console.log('action', action);
  next(action);
  console.log('nextState', store.getState());
}

export default loggerMiddleware;