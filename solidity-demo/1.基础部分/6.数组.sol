// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract array_demo {
  // 定长数组 T[N]
  string[5] public names;

  // 动态数组 T[]
  uint256[] public ages;

  constructor() {
    names[0] = "senmu";
    // 定长数组不允许 push
    // names.push("senmu2"); ❌
    
    // 动态数组不允许不存在的下标
    // ages[1024] = 110; ❌
    ages.push(111);
  }

  function setNames(string memory name, uint256 index) public {
    names[index] = name;
  }

  function getLength() external view returns (uint256, uint256) {
    return (names.length, ages.length);
  }
}