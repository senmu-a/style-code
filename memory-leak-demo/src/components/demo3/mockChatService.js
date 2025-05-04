// 一个非常简单的模拟聊天服务 (发布/订阅模式)
const chatService = {
  listeners: new Set(),
  subscribe(callback) {
    console.log('ChatService: New subscription added.');
    this.listeners.add(callback);
    // 返回一个取消订阅的函数
    return () => {
      console.log('ChatService: Subscription removed.');
      this.listeners.delete(callback);
    };
  },
  // 模拟接收到新消息并通知所有订阅者
  sendMessage(message) {
    console.log(`ChatService: Sending message "${message}" to ${this.listeners.size} listeners.`);
    this.listeners.forEach(callback => {
      try {
        callback(message);
      } catch (error) {
        console.error("Error in listener callback:", error);
      }
    });
  }
};

// 模拟后台不时发送消息
let msgCount = 0;
setInterval(() => {
  chatService.sendMessage(`New message #${++msgCount}`);
}, 3000); // 每 3 秒发一条消息

export default chatService;
