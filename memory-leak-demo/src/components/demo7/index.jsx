import React, { useEffect, useRef, useState } from 'react';
import WorkerConstructor from './myWorker.js?worker'; // 注意 '?worker' 后缀

function LeakyWorkerComponent({ componentId }) {
  const workerRef = useRef(null);
  const [lastMessage, setLastMessage] = useState(null);
  const [workerStatus, setWorkerStatus] = useState('Idle');

  useEffect(() => {
    console.log(`[LeakyWorker ${componentId}] Effect run. Creating Worker.`);
    setWorkerStatus('Initializing');

    // 创建 Web Worker 实例
    // 注意：路径通常相对于 public 目录或配置好的静态资源路径
    // const worker = new Worker('./myWorker.js'); // 确保路径正确
    const worker = new WorkerConstructor();
    workerRef.current = worker;

    // 设置消息处理器
    worker.onmessage = (event) => {
      console.log(`[LeakyWorker ${componentId}] Received message from worker:`, event.data);
      setLastMessage(event.data);
      if (event.data.type === 'update') {
        setWorkerStatus(`Running (Count: ${event.data.count})`);
      } else if (event.data.type === 'stopped') {
        setWorkerStatus('Stopped');
      }
    };

    // 设置错误处理器
    worker.onerror = (error) => {
      console.error(`[LeakyWorker ${componentId}] Error from worker:`, error);
      setWorkerStatus(`Error: ${error.message}`);
    };

    // 启动 Worker 中的任务
    worker.postMessage({ command: 'start' });
    setWorkerStatus('Starting...');

    // !!! 问题所在：缺少清理逻辑来终止 Worker !!!
    // 当组件卸载时，没有调用 workerRef.current.terminate()。
    // 这导致 Worker 线程继续在后台运行，执行 setInterval，并尝试 postMessage。
    // 即使主线程的 onmessage 监听器可能因为组件卸载而被垃圾回收（或不再有效），
    // Worker 本身及其占用的资源仍然存在。

    return () => {
      console.log(`[LeakyWorker ${componentId}] Component unmounting. Worker ref:`, workerRef.current);
      // 注意：这里没有调用 terminate()!
      // 如果我们只是发送 stop 命令，Worker 脚本会停止 interval，但 Worker 线程本身可能还在。
      workerRef.current?.postMessage({ command: 'stop' }); // 这只是停止任务，不是终止线程
    };

  }, [componentId]); // 如果 componentId 变了，理论上应该先终止旧的再创建新的

  const handleStopWorker = () => {
    workerRef.current?.postMessage({ command: 'stop' });
  };

  const handleRestartWorker = () => {
    workerRef.current?.postMessage({ command: 'start' });
    setWorkerStatus('Restarting...');
  };

  return (
    <div style={{ border: '1px solid brown', padding: '10px', margin: '5px' }}>
      <h1>Leaky Web Worker</h1>
      <p>Component ID: {componentId}</p>
      <p>Worker Status: {workerStatus}</p>
      <p>Last Message: {JSON.stringify(lastMessage)}</p>
      <button onClick={handleStopWorker}>Stop Worker Task</button>
      <button onClick={handleRestartWorker}>Restart Worker Task</button>
      <p>检查控制台日志和浏览器任务管理器（如果可用）。</p>
    </div>
  );
}

export default LeakyWorkerComponent;