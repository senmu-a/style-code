import { useState, useEffect } from 'react';

/**
 *  排查定时器内存泄漏
 *   1. 打开chrome devtool，然后点击Memory选项卡
 *   2. 点击记录快照按钮，开始记录内存快照
 *   3. 点击按钮隐藏掉组件，然后点击强制GC，继续记录快照
 *   4. 继续点击显示组件按钮，然后点击强制GC，继续记录快照
 *   5. 重复以上操作，观察内存变化，并且选择 Comparsion 来对比内存的增加
 * 
 *  排查结论/心得：
 *   1. 你会发现内存一直在增加，说明有内存泄漏
 *   2. 在对比时可以看到哪些是一直在增加的对象或者回调函数
 */
function LeakyCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 设置一个定时器，每秒钟增加 count 的值
    const intervalId = setInterval(() => {
      console.log('Interval is running, updating count...');
      setCount(c => c + 1); // 使用函数式更新避免闭包陷阱
    }, 1000);

    console.log(`Interval started with ID: ${intervalId}`);

    // return () => {
    //   // 清理函数会在组件卸载时运行
    //   console.log(`Cleaning up interval with ID: ${intervalId}`);
    //   clearInterval(intervalId);
    // };

  }, []); // 空依赖数组意味着 effect 只在挂载时运行一次

  return (
    <div>
      <h1>Leaky Counter</h1>
      <p>Count: {count}</p>
      <p>Check your console to see the interval running.</p>
    </div>
  );
}

export default LeakyCounter;