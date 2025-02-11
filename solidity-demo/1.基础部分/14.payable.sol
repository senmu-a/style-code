// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract payable_demo {
    uint256 balance;

    address payable public owner;
    //部署这个合约的时候 当前部署合约的人设置成owner 然后让他收款付款
    constructor() {
        owner = payable(msg.sender);
    }

    function deposit() public payable {
        //msg.value 就是用转账过来的金额
        balance += msg.value;
    }

    function withdraw(uint256 _num, address _to) public {
        //当前取钱的人不是管理员 不让你取
        require(msg.sender == owner, "You are not the owner");
        require(balance >= _num, "Insufficient balance");
        payable(_to).transfer(_num);
        // 两个账户之间转账 直接通过加减来完成
        // ETH的UTXO模型 address(this).balance
        balance -= _num;
    }
}

// abi.json

// import ABI from "abi.json"
// ABI.合约地址
// ABI.deposit 方法
// 参数 返回值
