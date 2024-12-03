let globalState = [];
let globalSubscriptions = [];
let stateIndex = 0;

function useState(initValue) {
  const currentIndex = stateIndex++;

  if (!(currentIndex in globalState)) {
    // 记录前一个值
    globalState[currentIndex] = initValue;
    globalSubscriptions[currentIndex] = new Set();
  }
  const setState = (newState) => {
    if (typeof newState === 'function') {
      newState = newState(globalState[currentIndex]);
    }
    globalState[currentIndex] = newState;

    // 触发所有的订阅者，进行数据更新
    for (const subscriber of globalSubscriptions[currentIndex]) {
      subscriber(newState);
    }
  }

  const subscribe = (subscriber) => {
    globalSubscriptions[currentIndex].add(subscriber);

    return () => {
      globalSubscriptions[currentIndex].delete(subscriber);
    }
  }

  return [globalState[currentIndex], setState, subscribe]
}

// 使用例子
const [count, setCount, subscribeCount] = useState(0);
subscribeCount((newValue) => {
  console.log('count changed:', newValue);
});
console.log('count:', count);
setCount(1);

// 使用例子
const [count1, setCount1, subscribeCount1] = useState(1);
subscribeCount1((newValue) => {
  console.log('count1 changed🌼:', newValue);
});
console.log('count1:', count1);
setCount1((count) => count + 2);
