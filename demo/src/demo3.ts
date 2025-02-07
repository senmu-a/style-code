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

// 先序遍历
function stackFirst1(root: TreeNode | null) {
  const stack = [root];
  while (stack.length) {
    const node = stack.pop(); // 根节点出栈
    console.log(node.cur);
    node.right && stack.push(node.right); // 右节点入栈
    node.left && stack.push(node.left); // 左节点入栈
  }
}

/**
 * 中序遍历
 * 顺序：左 -> 根 -> 右
 * 先把左子树的根节点和左节点入栈，然后出栈，再把右节点入栈
 * 步骤：
 *  1. 创建一个栈 stack，创建一个 node 节点指向 root
 *  2. 遍历 stack 或者 node 节点有内容
 *  3. 判断 node 是否有内容，如果有的话就把 node 入栈，然后 node 指向 node 的左节点（此步骤是处理左子树，不断向左走）
 *  4. 如果 node 为空，说明左子树已经走到头了，此时就要出栈，然后再把 node 的右节点入栈
 *  5. 重复 3-4 步骤，直到 stack 为空并且 node 为空
 */
function stackMiddle1(root: TreeNode | null) {
  const stack: TreeNode[] = [];
  let node = root;
  while (stack.length || node) {
    if (node) {
      stack.push(node);
      node = node.left;
    } else {
      node = stack.pop();
      console.log(node.cur);
      node = node.right;
    }
  }
}

/**
 * 后序遍历
 * 顺序：左 -> 右 -> 根
 * 按照顺序来看，也需要先处理左子树，而每次我们拿到的节点是“根节点”，那我们就将左子树中的这些根节点依次入栈，当处理到左子树的最后一个节点时，我们就要出栈，然后再判断处理右侧节点与根节点
 * 步骤：
 *  1. 创建一个栈 stack，创建一个 node 节点指向 root，创建一个 last 节点指向 null（关键！！！因为要保证右节点比根节点早输出）
 *  2. 遍历 stack 或者 node 节点有内容
 *  3. 判断 node 是否有内容，如果有的话就把 node 入栈，然后 node 指向 node 的左节点（此步骤是处理左子树，不断向左走）
 *  4. 如果 node 为空，说明左子树已经走到头了，此时就要出栈，并将 node 赋值为出栈的节点，判断该节点是否有右节点，如果有的话就把该节点入栈，如果没有的话就输出该节点
 *  5. 重复 3-4 步骤，直到 stack 为空并且 node 为空
 */
function stackLast1(root: TreeNode | null) {
  const stack: TreeNode[] = [];
  let node = root;
  let last: TreeNode | null = null;
  while (stack.length || node) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop();
    if (!node.right || node.right === last) {
      console.log(node.cur);
      last = node;
      node = null;
    } else {
      stack.push(node);
      node = node.right;
    }
  }
}