import { TreeNode } from "./demo";
import { Queue2 } from "./demo2";
/**
 * 二叉树的遍历
 * 深度优先：先序遍历、中序遍历、后序遍历
 * 广度优先：层序遍历
 */

// 1-1. 层序遍历（使用自建队列版）
function levelOrder(node: TreeNode | null) {
  if (node) {
    const queue = new Queue2();
    queue.join(node.cur);
    while(queue.len > 0) {
      const cur = queue.quit();
      console.log(cur);
      if (node.left) {
        queue.join(node.left.cur);
      }
      if (node.right) {
        queue.join(node.right.cur);
      }
    }
  }
}

// 1-2. 层序遍历（直接利用 push 和 shift）
function levelOrder2(node: TreeNode | null) {
  if (!node) return;
  const queue: number[] = [];
  queue.push(node.cur);
  while (queue.length) {
    const cur = queue.shift();
    console.log(cur);
    node.left && queue.push(node.left.cur);
    node.right && queue.push(node.right.cur);
  }
}

// 2-1. 递归-先序遍历
function recursion1(node: TreeNode | null) {
  if (node) {
    // 先遍历 root
    console.log(node.cur);
    // 再遍历左子节点
    recursion1(node.left);
    // 最后遍历右子节点
    recursion1(node.right);
  }
}

// 2-2. 迭代-先序遍历
function stackFirst(node: TreeNode | null) {
  if (!node) return;
  const stack: TreeNode[] = [];
  stack.push(node); // 根入栈
  while (stack.length) { // 当节点还没遍历完
    const node = stack.pop(); // 出栈
    console.log(node.cur);
    node.right && stack.push(node.right); // 右节点入栈
    node.left && stack.push(node.left); // 左节点入栈
  }
}

// 3-1. 递归-中序遍历
function recursion2(node: TreeNode | null) {
  if (node) {
    recursion2(node.left);
    console.log(node.cur);
    recursion2(node.right);
  }
}

// 3-2. 迭代-中序遍历
// 核心理念在于，先处理左子树，按照根、左节点的顺序入栈，然后执行出栈操作；出栈时顺带将右节点入栈
function stackMiddle(node: TreeNode | null) {
  if (!node) return;
  const stack: TreeNode[] = [];
  while (stack.length || node) {
    while (node) {
      stack.push(node); // 入栈顺序：根、左子树
      node = node.left; // 保证左侧子树一直到没有子节点
    }
    node = stack.pop(); // 左侧子树没有节点后，进行出栈操作
    console.log(node.cur);
    node = node.right; // 左侧子树没有节点后，对右侧子树进行操作，
  }
}

// 4-1. 递归-后序遍历
function recursion3(node: TreeNode | null) {
  if (node) {
    recursion3(node.left);
    recursion3(node.right);
    console.log(node.cur);
  }
}

// 4-2. 迭代-后序遍历
function stackLast(node: TreeNode | null) {
  if (!node) return;
  const stack: TreeNode[] = [];
  let last = null; // 关键在于需要 lash 记录最后一个节点
  while (stack.length || node) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop();
    if (!node.right || node.right === last) {
      console.log(node.cur);
      last = node;
      node = null
    } else {
      stack.push(node);
      node = node.right;
    }
  }
}