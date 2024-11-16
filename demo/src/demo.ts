// 链表初始化
export class ListNode {
  next: ListNode | null;
  cur: number;
  constructor(val?: number, next?: ListNode) {
    this.cur = val || 0;
    this.next = next || null;
  }
}

// 二叉树树初始化
export class TreeNode {
  left: TreeNode | null;
  right: TreeNode | null;
  cur: number;

  constructor(val?: number, left?: TreeNode, right?: TreeNode) {
    this.cur = val;
    this.left = left || null;
    this.right = right || null;
  }
}

// 堆
export class MaxHeap {
  private maxHeap: number[];

  constructor(nums?: number[]) {
    this.createMaxHeap(nums ? nums : []);
  }

  // 建堆
  createMaxHeap(nums: number[]) {
    this.maxHeap = [...nums];
    for (let i = this.parent(this.size() - 1); i >= 0; i--) {
      this.slidDown(i);
    }

  }

  size() {
    return this.maxHeap.length;
  }

  left(i: number) {
    return 2 * i + 1;
  }

  right(i: number) {
    return 2 * i + 2;
  }

  parent(i: number) {
    return Math.floor((i - 1) / 2);
  }

  // 访问堆顶元素
  peek() {
    return this.maxHeap[0];
  }

  // 元素入堆
  push(num: number) {
    this.maxHeap.push(num);
    this.slidUp(this.size() - 1);
  }

  // 从堆底开始重新入堆
  private slidUp(i: number) {
    const num = this.maxHeap[i];
    const parIndex = this.parent(i);
    if (parIndex < 0) return;
    const parent = this.maxHeap[parIndex];
    if (parent < num) {
      this.swap(i, parIndex);
      this.slidUp(parIndex);
    }
  }

  // 元素出堆（堆顶元素出堆）
  pop() {
    if (this.size() === 0) return;
    this.swap(0, this.size() - 1);
    // 将堆顶出堆
    const val = this.maxHeap.pop();
    // 从堆顶开始重新入堆
    this.slidDown(0);
    return val;
  }

  // 从堆顶开始重新入堆
  private slidDown(i: number) {
    while (true) {
      const l = this.left(i);
      const r = this.right(i);
      let cur = i;
      if (l < this.size() && this.maxHeap[l] > this.maxHeap[cur]) cur = l;
      if (r < this.size() && this.maxHeap[r] > this.maxHeap[cur]) cur = r;
      if (cur === i) break;
      this.swap(cur, i);
      i = cur;
    }
  }

  // slidDown 递归版
  private foo(i: number) {
    const l = this.left(i);
    const r = this.right(i);
    let cur = i;
    if (l < this.size() && this.maxHeap[l] > this.maxHeap[cur]) cur = l;
    if (r < this.size() && this.maxHeap[r] > this.maxHeap[cur]) cur = r;
    if (cur !== i) {
      this.swap(cur, i);
      // 继续递归
      this.foo(cur);
    }
  }

  // 交换两个元素
  private swap(i: number, j: number) {
    const temp = this.maxHeap[i];
    this.maxHeap[i] = this.maxHeap[j];
    this.maxHeap[j] = temp;
  }

  sort() {
    for (let i = this.size() - 1; i > 0; i--) {
      this.swap(i, 0);
      this.slidDown(0);
    }
  }
}