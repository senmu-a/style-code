// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

/**
 * interface 的特点：
 *  1. 不能包含构造函数
 *  2. 不能继承其他合约，只能继承接口
 *  3. 不能包含状态变量
 *  4. 只能包含功能声明，不能包含功能实现
 *  5. 所有功能/函数都是 external 的
 * interface 的好处：
 *  1. 标准化
 *    1.1 便于其他合约调用
 *    1.2 便于合约实现特定功能
 *  2. 安全性
 *    2.1 明确定义合约间的交互方式
 *    2.2 减少调用错误
 *  3. 可扩展性
 *    3.1 支持多重继承
 *    3.2 便于代码重用
 */

interface animalEat {
    function eat() external returns (uint256);
}

contract AA is animalEat {
    function eat() public pure override returns (uint256) {
        return 1;
    }
}
