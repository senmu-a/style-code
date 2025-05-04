import { useState, useEffect } from 'react';
import chatService from './mockChatService'; // 导入模拟服务

/**
 * 排查未取消的外部订阅的内存泄漏
 * 
 * 排查总结/心得
 *  1. 如果注册的外部订阅有打印的消息还好排查，可以通过不断增加的打印来排查
 *  2. 整体排查外部订阅的事件，看看是否有在组件卸载时取消订阅
 * 
 */
function LeakyChatMessages() {
  const [lastMessage, setLastMessage] = useState('');

  // 处理新消息的回调函数
  const handleNewMessage = (message) => {
    console.log('LeakyChatMessages: Received message -', message);
    setLastMessage(message);
  };

  useEffect(() => {
    // 组件挂载时，订阅聊天消息
    console.log('LeakyChatMessages: Subscribing to chat service.');
    const unsubscribe = chatService.subscribe(handleNewMessage);

    // !!! 问题所在：没有保存并调用取消订阅的函数 !!!
    // 当组件卸载时，订阅关系仍然存在于 chatService 中。

    // 正确的做法是保存 chatService.subscribe 返回的 unsubscribe 函数，
    // 并在清理函数中调用它。

    return () => {
      console.log('LeakyChatMessages: Unsubscribing from chat service.');
      unsubscribe();
    };

  }, []); // 空依赖数组

  return (
    <div>
      <h1>Leaky Chat Messages</h1>
      <p>Last message: {lastMessage || 'Waiting for messages...'}</p>
      <p>Check the console for subscription and message logs.</p>
    </div>
  );
}

export default LeakyChatMessages;