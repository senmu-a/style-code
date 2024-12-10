// React 中任务调度，使用 messageChannel 与 requestAnimationFrame

// 使用 requestAnimationFrame 计算当前这一帧还有多少时间，有空闲时间就去执行
// 计算逻辑放到宏任务（messageChannel）中
{
  let tasks: { task: () => void; expirationTime: number }[] = []; // 任务队列
  let isPerformingTask = false; // 表示当前是否有任务正在执行

  const channel = new MessageChannel(); // 创建一个新的消息通道
  const port = channel.port2; // 获取消息通道的第二个端口

  // 示例任务
  function myTask1() {
    console.log("Performing task 1");
  }

  function myTask2() {
    console.log("Performing task 2");
  }

  function myTask3() {
    console.log("Performing task 3");
  }

  function scheduleTask(task: () => void, expirationTime: number) {
    tasks.push({ task, expirationTime }); // 添加到任务队列
    if (!isPerformingTask) {
      isPerformingTask = true;
      port.postMessage(null); // 向通道的第二个端口发送一个空消息
    }
  }

  function performTask(currentTime: number) {
    const frameTime = 1000 / 60; // 每帧的时间间隔
    // 如果任务队列不为空，并且当前的时间减去预留的时间是否小于时间间隔（就是每帧的时间间隔是否还有预留时间）
    while (tasks.length > 0 && performance.now() - currentTime < frameTime) {
      const { task, expirationTime } = tasks.shift(); // 从任务队列中取出来任务以及过期时间
      // 如果当前的时间大于等于任务过期时间，则说明该执行该任务了，否则不执行
      if (performance.now() >= expirationTime) {
        task();
      } else {
        tasks.push({ task, expirationTime });
      }
    }

    // 可能没有足够的时间或者执行完了
    if (tasks.length) {
      requestAnimationFrame(performTask);
    } else {
      isPerformingTask = false;
    }
  }
}
