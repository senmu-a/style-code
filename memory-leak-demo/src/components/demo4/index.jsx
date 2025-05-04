import React, { useState, useEffect } from 'react';

// 模拟一个异步获取数据的函数
const fetchUserData = (userId) => {
  console.log(`[LeakyAsyncData] Fetching data for user ${userId}...`);
  return new Promise((resolve) => {
    // 模拟网络延迟
    setTimeout(() => {
      console.log(`[LeakyAsyncData] Data received for user ${userId}`);
      resolve({ id: userId, name: `User ${userId}` });
    }, 2000); // 假设请求需要 2 秒
  });
};

/**
 * 排查未取消的异步请求的内存泄漏
 *  由于异步回调的特性，并没有方法可以在退出时取消异步请求
 *  但是可以使用 AbortController 来取消请求。
 */
function LeakyAsyncData({ userId }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 使用 AbortController 来取消请求
  const abortController = new AbortController();
  const signal = abortController.signal;

  useEffect(() => {
    console.log(`[LeakyAsyncData] Effect run for user ${userId}. Starting fetch.`);
    setLoading(true);
    setError(null); // 重置错误状态

    // signal.abort() 方法可以在 fetchUserData 中使用来取消请求
    fetchUserData(userId, { signal })
      .then(data => {
        // !!! 问题点 !!!
        // 如果组件在 fetchUserData 完成之前就卸载了，
        // 这段代码仍然会在 2 秒后执行。
        // 此时调用 setUserData 或 setLoading 会在已卸载的组件上进行状态更新。
        console.log(`[LeakyAsyncData] Fetch success for ${userId}. Attempting state update.`);
        setUserData(data);
        setLoading(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          // 请求被取消，忽略错误
          console.log(`[LeakyAsyncData] Fetch aborted for ${userId}.`);
          return;
        }
        // 同样的问题，如果在卸载后发生错误
        console.log(`[LeakyAsyncData] Fetch error for ${userId}. Attempting state update.`);
        setError(err.message || 'Failed to fetch');
        setLoading(false);
      });

    // 清理函数
    return () => {
      console.log(`[LeakyAsyncData] Cleanup for user ${userId}.`);
      // 取消请求
      abortController.abort();
      // 这里不需要调用 setUserData 或 setLoading，因为组件已经卸载了
    };

  }, [userId]); // 当 userId 变化时重新获取数据

  if (loading) {
    return <div>Loading user data for {userId}...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Leaky Async Data</h1>
      {userData ? (
        <p>User Name: {userData.name}</p>
      ) : (
        <p>No user data.</p>
      )}
    </div>
  );
}

export default LeakyAsyncData;