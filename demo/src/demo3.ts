import { TreeNode } from "./demo";
import { Queue2 } from "./demo2";
/**
 * 二叉树的遍历
 * 深度优先：先序遍历、中序遍历、后序遍历
 * 广度优先：层序遍历
 */

// 1. 层序遍历
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

// 2. 先序遍历
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

// 3. 中序遍历
function recursion2(node: TreeNode | null) {
  if (node) {
    recursion2(node.left);
    console.log(node.cur);
    recursion2(node.right);
  }
}

// 4. 后序遍历
function recursion3(node: TreeNode | null) {
  if (node) {
    recursion3(node.left);
    recursion3(node.right);
    console.log(node.cur);
  }
}