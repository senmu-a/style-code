import { ListNode } from './demo';
/**
 * 队列的实现，使用两种逻辑结构：顺序结构、链表结构
 * 队列的规则：FIFO、只接受特定的某种类型的数据元素、空队列处理、不可以插队（只能依次入队依次出队）
 * 队列的方法：
 *  1. 队列的长度
 *  2. 队头
 *  3. 队尾
 *  4. 队列的遍历
 *  5. 入队
 *  6. 出队
 * 队列的延申：优先队列（可以插队，按照优先级入队出队）
 */

// 1. 使用顺序结构实现
class Queue1 {
  // 队列
  #queue: number[];
  // 队列的最大长度
  #maxLen = 100;
  // 队列的长度
  len: number;
  // 队头
  head: number;
  // 队尾
  tail: number;

  constructor() {
    this.#queue = [];
    this.len = 0;
  }

  join(value: number) {
    if (this.len < this.#maxLen) {
      this.#queue[this.len] = value;
      this.len++;
      if (this.len === 0) {
        this.head = value;
      }
      this.tail = value;
    } else {
      throw Error('maxQueue size is error!!');
    }
  }

  quit() {
    if (this.len > 0) {
      const tempValue = this.head;
      for (let i = 0; i < this.len; i++) {
        this.#queue[i] = this.#queue[i+1];
      }
      this.len--;
      return tempValue;
    } else {
      throw Error('xx');
    }
  }

  each() {
    for (let i = 0; i < this.len; i++) {
      console.log(this.#queue[i]);
    }
  }
}

// 2. 使用链表结构实现
export class Queue2 {
  // 队列
  #queue: ListNode | null;
  // 队列的最大长度
  #maxLen = 100;
  // 队列的长度
  len: number;
  // 队头
  head: number;
  // 队尾
  tail: number;

  constructor() {
    this.#queue = null;
    this.len = 0;
  }

  join(value: number) {
    if (this.len < this.#maxLen) {
      const node = new ListNode(value);
      if (this.tail) {
        this.#queue.next = node;
      } else {
        this.#queue = node;
        this.head = this.#queue.cur;
      }
      this.tail = node.cur;
    } else {
      throw Error('maxQueue size is error!!');
    }
    
  }

  quit() {
    if (this.len > 0) {
      const tempValue = this.head;
      this.#queue = this.#queue.next;
      this.head = this.#queue.cur;
      return tempValue;
    } else {
      throw Error('xx');
    }
  }

  each() {
    let node = this.#queue;
    for (let i = 0; i < this.len; i++) {
      console.log(node.cur);
      node = node.next;
    }
  }
}
