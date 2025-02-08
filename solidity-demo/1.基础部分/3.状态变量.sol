// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

/**
 * Solidity 状态变量详解
 * 
 * 状态变量特点：
 * 1. 永久存储在区块链上（存储在 storage 中）
 * 2. 所有合约实例共享
 * 3. 修改需要消耗 gas
 */
contract StateVariablesExample {
    /**
     * 1. 可见性修饰符（类似 TypeScript 的访问修饰符）
     */
    string public name;      // 公开的，任何人都可以访问，自动生成 getter 函数
    // 自动生成的 getter 函数：
    // function name() public view returns (string memory) {
    //     return name;
    // }
    uint256 private age;     // 私有的，只能在当前合约中访问，外部合约无法访问，也无法继承，也不会自动生成 getter
    uint256 internal score;  // 内部的，只能在当前合约和继承的合约中访问，外部合约无法访问，也不会自动生成 getter
    // external       // ⚠注意：状态变量不能是 external，只有函数可以使用 external 修饰符

    /**
     * 2. 常量（类似 TypeScript 的 const）
     */
    uint256 constant MAX_UINT = 2**256 - 1;  // 编译时确定的常量
    string constant VERSION = "1.0.0";        // 字符串常量

    /**
     * 3. 不可变变量（类似 TypeScript 的 readonly，但更严格）
     */
    address immutable owner;  // 只能在构造函数中赋值一次，之后不能修改

    /**
     * 4. 变量类型示例
     */
    // 值类型
    bool isActive = true;           // 布尔值
    uint256 count = 0;             // 无符号整数
    int256 temperature = -10;      // 有符号整数
    address wallet;                // 地址类型
    
    /**
     * 地址类型理解：
     *  1. 地址就像银行账号
     *  2. address 类似于只读的银行账号（只能查余额）
     *  3. address payable 类似于完整的银行账号（可以转账）
     */
    
    // 引用类型
    string public message;         // 字符串！！！
    uint[] public numbers;         // 动态数组
    mapping(address => uint) public balances;  // 映射（类似 TypeScript 的 Map）

    /**
     * 字符串为什么是引用类型？
     *  1. 字符串长度不固定，需要动态分配内存
     *  2. 实际存储的是指向数据的引用
     *  3. 需要指定存储位置（storage、memory）
     *  4. 作为参数传递时，需要指定存储位置
     */

    // 构造函数
    constructor() {
        owner = msg.sender;  // ❌ 错误，不可变变量在构造函数中初始化
        message = "Hello";
        wallet = msg.sender;
    }

    /**
     * 5. 状态变量的使用示例
     */
    function deposit() public payable {
        balances[msg.sender] += msg.value;  // 修改状态变量
    }

    function getBalance() public view returns (uint) {
        return balances[msg.sender];  // 读取状态变量
    }

    /**
     * TypeScript 对比：
     * 
     * class Contract {
     *     private readonly owner: string;
     *     public message: string;
     *     private balances: Map<string, number>;
     *     
     *     constructor() {
     *         this.owner = getCurrentUser();
     *         this.message = "Hello";
     *         this.balances = new Map();
     *     }
     * }
     */
}

/**
 * 重要说明：
 * 1. 状态变量的修改会消耗 gas
 * 2. 状态变量默认是 internal
 * 3. public 变量会自动生成 getter 函数
 * 4. constant 和 immutable 可以节省 gas
 * 5. 状态变量的改变会永久记录在区块链上
 * 6. 状态变量与局部变量不同，局部变量存储在内存中，不会永久记录在区块链上，不消耗 gas
 */
