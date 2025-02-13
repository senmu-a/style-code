// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

//Application Binary Interface
//ABI是一种JSON格式的接口描述语言，用于描述智能合约中的公共方法和事件
/**
 * 1.ABI编码 abi.encode, abi.encodePacked, abi.encodeWithSignature, abi.encodeWithSelector
 * 2.ABI解码 abi.decode
 */
// 数据是必须编码成字节码才能和智能合约交互！！！！
/**
 * 1.使用场景 abi.call 你不知道对方的interface
 * 2.生成abi.json 供前端调用
 * 3.对不开源的合约进行反编译比 0x7777f 调用ABI函数选择器来调用他
 */

contract ABIEncode {
    uint256 x = 10;
    address addr = 0x7A58c0Be72BE218B41C608b7Fe7C5bB630736C71;
    string name = "0xAA";
    uint256[2] array = [5, 6];

    // 标准编码，会补0到32字节
    function encode() public view returns (bytes memory result) {
        result = abi.encode(x, addr, name, array);
    }

    // 紧密编码，不会补0（省 gas，但是存在安全问题）
    function encodePacked() public view returns (bytes memory result) {
        result = abi.encodePacked(x, addr, name, array);
    }

    // function foo() {}

    // 带函数签名的编码
    function encodeWithSignature() public view returns (bytes memory result) {
        result = abi.encodeWithSignature(
            "foo(uint256,address,string,uint256[2])",
            x,
            addr,
            name,
            array
        );
    }

    // 带函数选择器的编码
    function encodeWithSelector() public view returns (bytes memory result) {
        result = abi.encodeWithSelector(
            //函数选择器
            //0xd6abfc7b000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000043078414100000000000000000000000000000000000000000000000000000000
            bytes4(keccak256("foo(uint256,address,string,uint256[2])")),
            x,
            addr,
            name,
            array
        );
    }

    function decode(
        bytes memory data
    )
        public
        pure
        returns (
            uint256 dx,
            address daddr,
            string memory dname,
            uint256[2] memory darray
        )
    {
        (dx, daddr, dname, darray) = abi.decode(
            data,
            (uint256, address, string, uint256[2])
        );
    }

    // function getSignatureName() public {
    //     bytes memory data = abi.encodeWithSelector(bytes4(0x77bb55c));
    //     (bool success,bytes memory retutnMetadata) = address(contract).staticcall(data);
    //     return  abi.decode(retutnMetadata,(string));
    // }
}

/**
 * ABI 的实际使用场景：
 *  1. 生成 ABI.json 文件，供前端调用
 *  2. 与未知合约交互
 *  3. 升级合约
 *  4. 事件日志解码
 */
