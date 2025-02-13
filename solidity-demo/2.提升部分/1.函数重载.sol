// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract hello {
    function saySomething() public pure returns (string memory) {
        return "hello world";
    }

    function saySomething(string memory something)
        public
        pure
        returns (string memory)
    {
        return something;
    }

    function f(uint8 _in) public pure returns (uint8 out) {
        out = _in;
    }

    function f(uint256 _in) public pure returns (uint256 out) {
        out = _in;
    }

     // ❌ 错误：不能仅通过返回值类型重载
    // function getValue() public pure returns (uint) { return 1; }
    // function getValue() public pure returns (string memory) { return "1"; }

    // ✅ 正确：通过参数类型重载
    function getValue(uint x) public pure returns (uint) { return x; }
    function getValue(string memory x) public pure returns (string memory) { return x; }
}

/**
 * 注意点：
 *  1. 重载函数的参数类型必须不同，否则会报错
 *  2. 不允许仅通过返回值类型的不同来重载函数
 */
