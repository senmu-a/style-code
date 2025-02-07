// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0; // 使用0.8.x版本的Solidity

contract Hello { // 类似于 class Hello {}
  string public greeting; // 类似于 TS 中 public greeting: string;

  constructor() { // 与 TS 类似，构造函数，初始化执行一次
    greeting = "Hello, World!";
  }

  // 设置方法
  function setGreeting(string memory _greeting) public {
    greeting = _greeting;
  }
  // 在 TS 中类似于：
  // public setGreeting(_greeting: string): void {
  //     this.greeting = _greeting;
  // }
  

  // 获取方法
  function say() public view returns (string memory) {
    return greeting;
  }
  // 在 TS 中类似于：
  // public say(): string {
  //     return this.greeting;
  // }
}

// public    // 可以被外部访问，类似 TS 中的 public
// memory    // 数据存储位置，表示临时存储（类似函数中的局部变量）
// view      // 表示这个函数只读取状态但不修改状态（类似 TS 中的 readonly）
// returns   // 声明返回值类型（类似 TS 中函数后面的 : 类型）

/**
 * Solidity 特有的概念：
 * 
 * 1. memory 关键字
 *    - 在 Solidity 中必须指定复杂类型（如 string）的存储位置
 *    - memory 表示临时存储 （消耗 gas 较少）
 *    - storage 表示永久存储（消耗 gas 较多）
 *    string public greeting; 是永久存储 storage，而 string memory _greeting 是临时存储 memory
 *    一般来说，函数参数和局部变量使用 memory，状态变量使用 storage
 * 
 * 2. view 关键字
 *    - 明确声明函数是否修改状态
 *    - view 表示只读
 *    - pure 表示既不读取也不修改状态
 * 
 * 3. 状态持久化
 *    - Solidity 中的状态变量会永久存储在区块链上
 *    - 每次修改都会消耗 gas
 * 
 * 4. gas 费用
 *    - 修改状态的操作需要支付 gas
 *    - 只读操作不需要 gas
 */