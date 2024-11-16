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