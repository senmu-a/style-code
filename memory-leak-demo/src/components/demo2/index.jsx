import { useState, useEffect } from 'react';


/**
 * 排查window对象未移除的全局事件监听器的内存泄漏
 *  1. 打开chrome devtool，点击 Element 选项卡
 *  2. 右侧的 Event Listeners 选项卡，查看 window 对象上注册的事件监听器
 *  3. 交互/操作组件，查看是否有重复的事件一直被添加
 * 
 * 排查总结/心得
 *  1. 你会发现 window 对象上一直在增加 resize（重复） 事件的监听器
 * 
 */
function LeakyWindowSize() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 这个处理函数会在窗口大小改变时被调用
  const handleResize = () => {
    console.log('Resize event triggered in LeakyWindowSize');
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // 在 window 对象上添加 'resize' 事件监听器
    console.log('LeakyWindowSize: Adding resize listener');
    window.addEventListener('resize', handleResize);

    // !!! 问题所在：没有返回清理函数来移除监听器 !!!
    // 当这个组件卸载时，事件监听器仍然附加在 window 对象上。

    return () => {
      // 这里应该移除事件监听器
      console.log('LeakyWindowSize: Removing resize listener');
      // window.removeEventListener('resize', handleResize);
    };

  }, []); // 空依赖数组意味着 effect 只在挂载时运行一次

  return (
    <div>
      <h1>Leaky Window Size</h1>
      <p>Current window width: {windowWidth}px</p>
      <p>Resize the window and check the console.</p>
    </div>
  );
}

export default LeakyWindowSize;