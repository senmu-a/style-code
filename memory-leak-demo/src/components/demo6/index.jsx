import React, { useEffect, useRef, useState } from 'react';

/**
 * 排查requestAnimationFrame没有取消导致的内存泄漏
 * 
 * 排查总结/思路
 *  与定时器没有清理类似，也可以通过内存对照的记录来查看回调函数是否还会不断的被调用
 */
function LeakyAnimationComponent() {
  const elementRef = useRef(null);
  // 使用 useRef 来存储 requestAnimationFrame 返回的 ID
  const animationFrameIdRef = useRef(null);
  // 使用 useState 只是为了让动画改变点东西
  const [position, setPosition] = useState(0);

  useEffect(() => {
    console.log('[LeakyAnimation] Effect run. Starting animation loop.');

    // 定义动画循环函数
    const animate = (timestamp) => {
      console.log('[LeakyAnimation] Animation frame callback.', timestamp); // 频繁打印，可以注释掉

      // 简单的动画逻辑：左右移动
      setPosition(prevPos => (prevPos + 1) % 200); // 在 0-199 之间循环

      // !!! 关键：递归调用 requestAnimationFrame 来继续下一帧 !!!
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    // 启动动画循环
    animationFrameIdRef.current = requestAnimationFrame(animate);

    // !!! 问题所在：缺少清理函数来取消动画帧请求 !!!
    // 当组件卸载时，最后一次对 requestAnimationFrame(animate) 的调用已经安排好了，
    // 并且由于 animate 函数是一个闭包，它可能持有对组件作用域（如 setPosition）的引用。
    // 即使组件 DOM 被移除，这个循环也会（尝试）继续下去，阻止相关对象被垃圾回收，
    // 并且持续消耗 CPU 进行不必要的计算和请求。

    return () => {
        console.log(`[LeakyAnimation] Component unmounting. Last animation frame ID: ${animationFrameIdRef.current}`);
        // 注意：这里没有调用 cancelAnimationFrame!
        cancelAnimationFrame(animationFrameIdRef.current); // 取消动画帧请求
    };

  }, []); // 空依赖数组，只在挂载时运行一次 effect

  useEffect(() => {
    // 更新 DOM 元素的样式
    if (elementRef.current) {
      elementRef.current.style.transform = `translateX(${position}px)`;
    }
  }, [position]); // 当 position 变化时更新样式

  return (
    <div style={{ border: '1px solid orange', padding: '10px', margin: '5px', overflow: 'hidden' }}>
      <h1>Leaky Animation Frame</h1>
      <div
        ref={elementRef}
        style={{
          width: '50px',
          height: '50px',
          backgroundColor: 'orange',
          position: 'relative', // 确保 transform 生效
        }}
      ></div>
      <p>检查控制台日志和浏览器的性能监视器。</p>
    </div>
  );
}

export default LeakyAnimationComponent;