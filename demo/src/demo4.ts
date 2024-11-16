import { TreeNode } from './demo';
/** 排序算法 */

// -------------------------冒泡排序开始---------------------------
const arr = [4, 1, 3, 1, 5, 2];
function bubbleSort1() {
  let i = 0;
  let len = arr.length;
  while (i < len) {
    if (i === len - 1) {
      len--;
      i = 0;
    }
    if (arr[i] > arr[i + 1]) {
      const temp = arr[i + 1];
      arr[i+1] = arr[i];
      arr[i] = temp;
    }
    i++;
  }
  return arr;
}

function bubbleSort2() {
  for (let i = 0; i < arr.length-1; i++) {
    // 优化最好情况
    let flag = true;
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j + 1];
        arr[j+1] = arr[j];
        arr[j] = temp;
        flag = false;
      }
    }
    if (flag) break;
  }
}
// -------------------------冒泡排序结束----------------------------

// -------------------------插入排序开始----------------------------

function insertionSort1() {
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] < arr[j]) {
        const temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
    }
  }
}

function insertionSort2() {
  for (let i = 1; i < arr.length; i++) {
    let base = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > base) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = base;
  }
}
 
// -------------------------插入排序结束----------------------------

// -------------------------选择排序开始----------------------------
function selectionSort1() {
  for (let i = 0; i < arr.length; i++) {
    // 最小元素 k
    let k = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[k] > arr[j]) {
        k = j;
      }
    }
    const temp = arr[k];;
    arr[k] = arr[i];
    arr[i] = temp;
  }
}

// -------------------------选择排序结束----------------------------

// -------------------------二叉树排序开始--------------------------
const nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13]
class BinarySearchTreeNode extends TreeNode {}
class BinarySearchTree {
  private rootNode: BinarySearchTreeNode;

  constructor(num?: number) {
    if (num) {
      const node = new BinarySearchTreeNode(num);
      this.rootNode = node;
    }
  }

  private insertion(root: BinarySearchTreeNode, node: BinarySearchTreeNode) {
    if (root.cur < node.cur) {
    	if (root.right) {
        this.insertion(root.right, node);
      } else {
      	root.right = node;
      }
    } else {
    	if (root.left) {
        this.insertion(root.left, node);
      } else {
      	root.left = node;
      }
    }
  }

  // 中序遍历
  private midEacher(node: BinarySearchTreeNode, callback: (num?: number) => void) {
    if (node) {
      this.midEacher(node.left, callback);
      callback(node.cur);
      this.midEacher(node.right, callback);
    }
  }

  private searcher(node: BinarySearchTreeNode, num: number): BinarySearchTreeNode {
    if (!node) return null;
    if (node.cur === num) {
      return node;
    } else if (node.cur < num) {
      return this.searcher(node.right, num);
    } else {
      return this.searcher(node.left, num);
    }
  }

  // 插入新元素
  insert(num: number) {
    const node = new BinarySearchTreeNode(num);
    if (!this.rootNode) {
      this.rootNode = node;
    } else {
      if (this.rootNode.cur === node.cur) return;
      this.insertion(this.rootNode, node);
    }
  }

  // TODO：删除元素
  delete() {}

  // 从小到大排序
  sort(callback: (num?: number) => void) {
    if (!this.rootNode) return;
    this.midEacher(this.rootNode, callback)
  }

  // 查找元素
  search(num: number) {
    if (!this.rootNode) return;
    return this.searcher(this.rootNode, num);
  }
}

const binarySearchTree = new BinarySearchTree();

nodes.forEach((num: number) => {
  binarySearchTree.insert(num);
});

binarySearchTree.sort((num) => {
  console.log('binarySearchTree sort: ', num);
})

console.log(binarySearchTree.search(13), 'got it!!');

// -------------------------二叉树排序结束--------------------------

// -------------------------快速排序开始----------------------------
// TODO：快速排序优化
function swap(nums: number[], i: number, j: number) {
  const temp = nums[j];
  nums[j] = nums[i];
  nums[i] = temp;
}
function partition(nums: number[], left: number, right: number) {
  // 拿到基准值 base、左指针 i、右指针 j
  let base = nums[left];
  let i = left;
  let j = right;
  // 保证左指针小于右指针
  while (i < j) {
    // 向左移动右指针，直到碰到{指向的值}小于基准值（注意：如果右指针{指向的值}都比基准值大，那么就到左指针与右指针相遇停止）
    while (i < j && nums[j] >= base) {
      j--;
    }
    // 向右移动左指针，直到碰到{指向的值}大于基准值（注意：如果左指针{指向的值}都比基准值小，那么就到左指针与右指针相遇停止）
    while (i < j && nums[i] <= base) {
      i++;
    }
    // 交换左右指针指向的值
    swap(nums, i, j);
  }
  // 交换左指针与基准指针的值
  swap(nums, i, left);
  return i;
}

function quickSort(nums: number[], left: number, right: number) {
  // 左指针与右指针相遇停止
  if (left >= right) return;
  // 拿到每次分治后的中间指针，原则上是：左侧区的所有数 <= 基准值 <= 右侧区的所有数
  const pivot = partition(nums, left, right);
  // 递归处理左侧区
  quickSort(nums, left, pivot - 1);
  // 递归处理右侧区
  quickSort(nums, pivot + 1, right);
}


// -------------------------快速排序结束----------------------------

// -------------------------堆排序开始------------------------------

// -------------------------堆排序结束------------------------------

// -------------------------希尔排序开始----------------------------

// -------------------------希尔排序结束----------------------------