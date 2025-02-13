/**
 * CPU 密集型任务会阻塞主线程，导致后续的 I/O 任务无法执行。
 */

/**
 * 示例：CPU 密集型任务阻塞主线程
 */
// 执行时 Node.js 版本：v18.18.0
// {
//   // 模拟一个耗时 3 秒的 CPU 任务
//   function block() {
//     const end = Date.now() + 3000;
//     while (Date.now() < end) {} // 空循环占用主线程
//   }
  
//   setTimeout(() => {
//     console.log('Timeout 回调执行'); // 3 秒后才输出
//   }, 0);
  
//   block(); // 阻塞主线程
// }

/**
 * 解决方案1：将 CPU 密集型任务转移到子线程
 */
// 执行时 Node.js 版本：v18.18.0
// {
//   const { Worker } = require('worker_threads');

//   function unblock() {
//     // 创建一个子线程
//     const worker = new Worker(`
//       const { parentPort } = require('worker_threads');
//       parentPort.on('message', (n) => {
//         const end = Date.now() + 3000;
//         while (Date.now() < end) {}  // 耗时计算在子线程执行
//         parentPort.postMessage('done');
//       });
//     `, { eval: true });
//     // 监听子线程的消息
//     worker.on('message', (message) => {
//       console.log('主线程接收到子线程的消息：', message);
//       worker.terminate(); // 终止子线程
//     });
    
//     // 向子线程发送消息
//     worker.postMessage(40);
//   }

//   console.log('主线程继续执行');
  
//   setTimeout(() => {
//     console.log('Timeout 回调执行'); // 立即输出，不会被阻塞
//   }, 0);

//   unblock();
// }

/**
 * 解决方案2: 使用 Cluster 模块
 */
// 执行时 Node.js 版本：v18.18.0
{
  const cluster = require('cluster');
  // const numCPUs = require('os').cpus().length;

  if (cluster.isPrimary) {
    console.log(`主进程 ${process.pid} 正在运行`);
    // 创建工作进程
    const worker = cluster.fork();

    // 监听工作进程的消息
    worker.on('message', (result) => {
      console.log(`主进程接收到工作进程 ${worker.process.pid} 的结果：`, result);
      worker.kill(); // 终止工作进程
    });

    worker.send('start_task');

    // 向所有工作进程发送任务
    // Object.values(cluster.workers).forEach(worker => {
    //   worker.send('start_task');
    // });

  } else {
    console.log(`工作进程 ${process.pid} 已启动`);

    // 监听来自主进程的消息
    process.on('message', (msg) => {
      if (msg === 'start_task') {
        // 模拟 CPU 密集型任务
        const result = performCPUIntensiveTask();
        // 将结果发送回主进程
        process.send(result);
      }
    });
  }

  function performCPUIntensiveTask() {
    // 模拟一个耗时的计算任务
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += Math.random();
    }
    return result;
  }
}
