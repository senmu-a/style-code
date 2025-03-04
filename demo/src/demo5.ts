/** 查找算法 */
const arr = [3, 2, 4, 5, 1, 7];
class Search {
  /** 顺序查找 */
  seqSearch(arr: number[], target: number): number {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === target) {
        return i;
      }
    }
    return -1;
  }

  /** 二分查找 */
  binarySearch(arr: number[], target: number) {
    let i = 0;
    let j = arr.length - 1;
    while (i <= j) {
      const mid = Math.floor((i + j) / 2);
      if (arr[mid] === target) {
        return mid;
      } else if (arr[mid] > target) {
        j = mid - 1;
      } else {
        i = mid + 1;
      }
    }
    return -1;
  }

  /** 二叉搜索树查找，demo4 中有 */

  /** 哈希查找 */
  hashSearch(arr: number[], target: number) {
    const hash = new Map();
    /** 构建哈希表 */
    for (let i = 0; i < arr.length; i++) {
      hash.set(arr[i], i);
    }
    /** 查找 */
    return hash.get(target);
  }
}

/** 合并两个有序链表 */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
      this.val = (val === undefined ? 0 : val);
      this.next = (next === undefined ? null : next);
  }
}

/**
 * 合并两个有序链表
 *  1. 容错判断
 *  2. 创建一个新的链表用来存放合并后的链表
 *  3. 遍历两个链表，比较两个链表的值，将较小的值放入新链表中
 *  4. 当其中一个链表遍历完后，将另一个链表剩余的部分直接放入新链表中
 *  5. 返回新链表
 * 时间复杂度：最坏的情况下，两个链表都需要遍历一遍，所以时间复杂度为 O(n)
 * 空间复杂度：O(1)
 */
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  if (!list1 && !list2) return null;
  if (list1 && !list2) return list1;
  if (!list1 && list2) return list2;

  let dummy = new ListNode();
  let node = dummy

  while (list1 && list2) {
      if (list1.val <= list2.val) {
          node.next = new ListNode(list1.val);
          list1 = list1.next;
      } else {
          node.next = new ListNode(list2.val);
          list2 = list2.next;
      }
      node = node.next;
  }
  node.next = list1 || list2;
  return dummy.next;
};
