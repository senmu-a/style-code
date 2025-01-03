import compose from "./compose.js";
const applyMiddleware = (...middlewares) => {
  return (oldCreateStore) => {
    
    return (reducer, initState) => {
      // 这里代替 demo6 中用户自执行的情况
      const store = oldCreateStore(reducer, initState);
      const simpleStore = { getState: store.getState };
      // 扁平化链
      const chain = middlewares.map(middleware => middleware(simpleStore));
      // 组合
      const dispatch = compose(...chain)(store.dispatch)
      return {
        ...store,
        dispatch
      }
    }
  }
}

export default applyMiddleware;