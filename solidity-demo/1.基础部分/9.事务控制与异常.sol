/**
 * 1.revert 事物回滚 会消耗gas
 * 2.error 消耗gas最低
    2-1 error既可以告知用户抛出异常的原因，又能省gas。
 * 3.assert 错误判断 会消耗光gas assert(bool,cond_expr);
    3-1 一般不对外 内部变量判断 pure函数 用于检测系统级别的错误 代码层面的错误
    函数结尾或者函数头部 入参和必要条件检测
 * 4.require(bool cond_expr, string msg); 退还gas
    4-1 跟用户打交道的 require(input_var>100);
    4-2 合约掉合约 require(合约地址!=address(0));
 */

// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract ExceptionDemo {
    mapping(address => uint256) public balances;
    // 1. revert
    function withDraw(uint256 amount) public {
      if (amount > balances[msg.sender]) {
        revert("Insufficient balance."); // 回滚交易并返回错误信息
      }
    }

    // 2. error 推荐使用（gas 消耗最低）
    error InsufficientBalance(uint256 available, uint256 amount);

    function withDraw2(uint256 amount) public {
      if (amount > balances[msg.sender]) {
        revert InsufficientBalance(balances[msg.sender], amount); // 回滚交易并返回错误信息
      }
    }

    // 3. assert
    function withDraw3(uint256 amount) public {
      assert(amount <= balances[msg.sender]); // 消耗所有 gas
    }

    // 4. require
    function withDraw4(uint256 amount) public {
      require(amount <= balances[msg.sender], "Insufficient balance."); // 退还多余的 gas
    }
}