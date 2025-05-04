import React, { useState, useEffect } from 'react';
import { getExpensiveDerivedData, getCacheSize, logCacheContents, clearCalculationCache } from './expensiveCalculationCache';

/**
 * 排查存在内存缓存的内存泄露问题
 *  1. 组件使用了一个昂贵的计算函数，并将结果存储在一个全局缓存中。
 *  2. 组件在卸载时没有清理缓存，导致内存泄漏。
 *  3. 排查思路也需要不断去记录内存快照来看内存是否会不断增加。
 */
function LeakyCacheUserComponent({ componentData }) {
  // 根据传入的 props 计算派生数据
  const derivedData = getExpensiveDerivedData(componentData);

  // 组件内部状态，只是为了让组件有点内容
  const [internalCount, setInternalCount] = useState(0);

  useEffect(() => {
    console.log(`[LeakyCacheUser ${JSON.stringify(componentData)}] 组件挂载/更新.`);
    // !!! 问题所在：组件只负责使用缓存，不负责清理 !!!
    // 当组件卸载时，它通过 getExpensiveDerivedData 添加到 calculationCache 中的条目
    // 仍然保留在缓存中。如果不断创建具有不同 componentData 的 LeakyCacheUserComponent 实例，
    // calculationCache 会无限增长，即使这些组件实例已经被卸载。
    // 这会消耗内存，因为缓存持有了计算结果（可能很大），
    // 并且如果计算结果间接引用了其他对象，也会阻止它们被回收。

    // (仅用于演示) 尝试在卸载时打印缓存大小
    return () => {
        console.log(`[LeakyCacheUser ${JSON.stringify(componentData)}] 组件即将卸载。当前缓存大小: ${getCacheSize()}`);
        logCacheContents();
        // clearCalculationCache();
    }

  }, [componentData]); // 当 componentData 改变时重新计算

  return (
    <div style={{ border: '1px dashed blue', padding: '10px', margin: '5px' }}>
      <h1>Leaky Cache User</h1>
      <p>Input Data: {JSON.stringify(componentData)}</p>
      <p>Derived Data Index: {derivedData.calcIndex}</p>
      <p>Internal Count: {internalCount}</p>
      <button onClick={() => setInternalCount(c => c + 1)}>Inc Internal</button>
      <p>全局缓存大小: {getCacheSize()}</p>
    </div>
  );
}

export default LeakyCacheUserComponent;