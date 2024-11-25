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
