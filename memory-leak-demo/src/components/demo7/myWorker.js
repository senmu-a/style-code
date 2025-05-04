// worker.js - 一个简单的 Web Worker
let intervalId = null;
let counter = 0;

self.onmessage = function(event) {
  console.log('[Worker] Received message:', event.data);

  if (event.data.command === 'start') {
    if (intervalId) clearInterval(intervalId); // 清除之前的定时器
    counter = 0;
    intervalId = setInterval(() => {
      counter++;
      // 向主线程发送计数更新
      self.postMessage({ type: 'update', count: counter });
    }, 1000); // 每秒发送一次更新
    console.log('[Worker] Started counter interval.');

  } else if (event.data.command === 'stop') {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      console.log('[Worker] Stopped counter interval.');
      // 可以选择发送一个停止确认
      self.postMessage({ type: 'stopped' });
    }
  } else if (event.data.command === 'terminate') {
      console.log('[Worker] Received terminate command. Closing worker.');
      if (intervalId) clearInterval(intervalId);
      self.close(); // Worker 自我终止
  }
};

console.log('[Worker] Worker script loaded and ready.');

// 可以在 Worker 内部处理未捕获的错误
self.onerror = function(error) {
  console.error('[Worker] Error in worker:', error);
  // 可以尝试通知主线程
  self.postMessage({ type: 'error', message: error.message });
};