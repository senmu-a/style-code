import { ListNode } from './demo';
/**
 * 栈的实现，使用两种逻辑结构：顺序结构、链表结构
 * 栈的规则：LIFO、只接受特定的某种类型的数据元素、只能从栈顶加入和读取数据元素、空栈与满栈的处理（栈需要设限）
 * 可以使用的：
 *  1. 栈顶
 *  2. 目前栈的长度
 *  3. 遍历栈
 *  4. 添加数据元素
 *  5. 删除数据元素
 */

// 顺序结构的实现方式
class Stack1 {
  // 栈数组
  #stack: number[];
  // 栈的最大长度
  #maxLen = 100;
  // 目前栈的长度
  len: number;
  // 栈顶元素
  top: number;
  constructor() {
    this.len = 0;
  }

  insert(value: number) {
    if (this.len < this.#maxLen) {
      this.#stack[this.len] = value;
      this.len++;
      // 赋值栈顶
      this.top = value;
    } else {
      throw Error('maxStack size is error!!');
    }
  }

  delete() {
    if (this.len > 0) {
      const tempValue = this.top;
      this.len--;
      this.top = this.#stack[this.len-1];
      for (let i = this.len; i > 0; i --) {
        this.#stack[i] = this.#stack[i-1];
      }
      return tempValue;
    } else {
      throw Error('minStack size is error!!');
    }
  }

  each() {
    for (let i = this.len - 1; i >= 0; i--) {
      console.log(this.#stack[i])
    }
  }
}

// 链表结构的实现方式
class Stack2 {
  // 栈数组
  #stack: ListNode | null;
  // 栈的最大长度
  #maxLen = 100;
  // 目前栈的长度
  len: number;
  // 栈顶元素
  top: number;

  constructor() {
    this.#stack = null;
    this.len = 0;
  }

  insert(value: number) {
    if (this.len < this.#maxLen) {
      // 不能这么搞，否则删除时就很麻烦了
      // if (!this.#stack) {
      //   this.#stack = new ListNode(value);
      // } else {
      //   this.#stack.next = new ListNode(value);
      // }
      // this.top = value;
      const listNode = new ListNode(value, this.#stack);
      this.#stack = listNode;
      this.top = value;
      this.len++;
    } else {
      throw Error('maxStack size is error!!');
    }
  }

  delete() {
    if (this.len > 0) {
      const tempValue = this.top;
      this.#stack = this.#stack.next;
      this.top = this.#stack.cur;
      return tempValue;
    } else {
      throw Error('xx')
    }
  }

  each() {
    let node = this.#stack;
    for (let i = 0; i < this.len; i++) {
      console.log(node.cur);
      node = node.next;
    }
  }
}

