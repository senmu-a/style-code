interface ITaskItem {
  task: (...args: any[]) => void;
  expriedTime: number;
}

{
  const tasks: ITaskItem[] = [];
  let isPerformTask = false;
  const intervalTime = 1000 / 60;

  const messageChannel = new MessageChannel();
  const port = messageChannel.port2;

  function scheduleTask(task: ITaskItem) {
    tasks.push(task);
    if (!isPerformTask) {
      isPerformTask = true;
      port.postMessage(null);
    }
  }

  function performTask(currentTime: number) {
    while (tasks.length && performance.now() - currentTime < intervalTime) {
      const task = tasks[0];
      if (performance.now() >= task.expriedTime) {
        task.task();
        tasks.shift();
      } else {
        break;
      }
    }

    if (tasks.length) {
      requestAnimationFrame(performTask);
    } else {
      isPerformTask = false;
    }
  }

  messageChannel.port1.onmessage = () => requestAnimationFrame(performTask);

  scheduleTask({
    task: () => {
      console.log('task1');
    },
    expriedTime: Date.now() + 1000,
  });
  scheduleTask({
    task: () => {
      console.log('task2');
    },
    expriedTime: Date.now() + -1, // 最高优先级
  });
  scheduleTask({
    task: () => {
      console.log('task3');
    },
    expriedTime: Date.now() + 3000,
  });


}


