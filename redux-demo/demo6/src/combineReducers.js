/**
 * 合并 Reducers
 * @param {*} reducers 
 * @returns 
 */
export default function combineReducers(reducers) {
  // 利用闭包存储所有的 reducers 信息
  const reducerKeys = Object.keys(reducers);

  // 返回一个组装好的 combineReducer，dispatch 执行的就是当前合并后的 reducer，其实本质就是将所有我们定义的 reducer 放到一个大对象中去匹配
  return function combineReducer(state = {}, action) {
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