// 模块级别的缓存对象
const calculationCache = new Map();
let calculationCounter = 0; // 只是为了演示计算是否发生

// 模拟昂贵的计算函数，并使用缓存
export const getExpensiveDerivedData = (inputData) => {
  // 使用 inputData 的某种序列化形式作为 key (这里简化处理)
  // 注意：对于复杂对象，需要更可靠的序列化或引用作为 key
  const cacheKey = JSON.stringify(inputData);

  if (calculationCache.has(cacheKey)) {
    console.log(`[Cache] 命中缓存，Key: ${cacheKey}`);
    return calculationCache.get(cacheKey);
  }

  console.log(`[Cache] 未命中缓存，执行计算，Key: ${cacheKey}`);
  calculationCounter++;
  // 模拟昂贵计算的结果
  const result = {
    processed: `Data for ${JSON.stringify(inputData)}`,
    timestamp: Date.now(),
    calcIndex: calculationCounter
  };

  // 存入缓存
  calculationCache.set(cacheKey, result);
  console.log(`[Cache] 存入缓存。当前缓存大小: ${calculationCache.size}`);

  return result;
};

// 提供一个查看缓存大小的方法（用于调试）
export const getCacheSize = () => calculationCache.size;

// 提供一个清空缓存的方法（用于调试或特殊场景）
export const clearCalculationCache = () => {
    console.log('[Cache] 清空缓存。');
    calculationCache.clear();
};

// (可选) 打印当前缓存内容的方法
export const logCacheContents = () => {
    console.log('[Cache] 当前缓存内容:');
    calculationCache.forEach((value, key) => {
        console.log(`  Key: ${key}, Value:`, value);
    });
};