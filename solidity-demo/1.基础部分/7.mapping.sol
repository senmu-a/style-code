// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract mapping_demo {
  // mapping 类型
  mapping(address => uint256) public balances;

  constructor() {
    balances[msg.sender] = 100;
  }

  function setBalance(uint256 _balance, address _address) public {
    balances[_address] = _balance;
  }

  function getBalance(address _address) external view returns (uint256) {
    return balances[_address];
  }
}