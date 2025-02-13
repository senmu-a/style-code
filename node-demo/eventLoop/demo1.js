const fs = require('fs');
/**
 * 线程模型
 *  - Node.js 的主线程是单线程的，负责运行 JavaScript 代码和事件循环。
 *  - 异步 I/O 操作（如文件读写）通过底层线程池（如 libuv）执行，完成后由事件循环回调主线程处理结果。
 *  - 这种模型适合高并发 I/O 密集型场景，但 CPU 密集型任务可能阻塞主线程。
 * 
 * 事件循环
 *  - 什么是事件循环？
 *    - 核心作用：Node.js 通过事件循环处理异步任务，用单线程实现高并发。
 *    - 类比理解：你作为餐厅服务员（主线程）负责接单、上菜的流程，事件循环就是待办清单：
 *      - 新订单（I/O）来了 -> 交给后厨（线程池）处理
 *      - 后厨做完菜（异步任务完成） -> 通知你上菜（回调函数）
 *  - 事件循环的阶段：
 *    - timers：定时器阶段，执行 setTimeout() 和 setInterval() 的回调
 *    - pending callbacks：
 *      - 任务：处理操作系统通知的 I/O 回调（如 TCP 错误）。
 *      - 示例：网络请求的错误处理。
 *    - idle, prepare：闲置/准备阶段，Node 内部使用
 *    - poll：
 *      - 核心阶段：执行 I/O 回调（文件读写、网络请求）；检查是否有定时器到期，有的话跳到阶段一执行回调。
 *    - check：执行 setImmediate() 的回调
 *    - close callbacks：关闭回调阶段
 *      - 任务：处理关闭事件的回调（如 socket.on('close', ...)）。
 */

/**
 * 示例：事件循环的执行顺序
 *  - 宏任务（macrotask）：setTimeout、setInterval、setImmediate、I/O
 *  - 微任务（microtask）：Promise.then、process.nextTick
 *  - 执行顺序：微任务队列优先，每个阶段结束后清空微任务队列。宏任务按事件循环阶段执行。
 */
{
  setTimeout(() => console.log('Timeout'), 0);
  setImmediate(() => console.log('Immediate'));
  
  fs.readFile('file.txt', (err, data) => {
    setTimeout(() => console.log('Timeout in Poll'), 0);
    setImmediate(() => console.log('Immediate in Poll'));
    process.nextTick(() => console.log('NextTick in Poll'));
  });
  
  Promise.resolve().then(() => console.log('Promise'));
  process.nextTick(() => console.log('NextTick'));
}
// 执行时 Node.js 版本：v18.18.0
// 在上面代码 fs.readFile 不发生错误时，输出顺序如下：
// NextTick
// Promise
// Timeout
// Immediate
// NextTick in Poll
// Immediate in Poll
// Timeout in Poll

// 发生错误时，输出顺序如下：
// NextTick
// Promise
// Timeout
// NextTick in Poll
// Immediate
// Immediate in Poll
// Timeout in Poll

