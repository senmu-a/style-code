// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract modifier_demo {
    address public admin;
    uint256 public amount;

    constructor() {
        //部署合约的时候
        admin = msg.sender;
        amount = 101;
    }

    // 定义修饰符
    modifier onlyAdmin() {
        // assert(msg.sender == admin);
        require(msg.sender == admin, "only admin can call");
        _;
    }

    // 使用修饰符
    function setCount(uint256 _amount) public onlyAdmin {
        amount = _amount;
    }
}
