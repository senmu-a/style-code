// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

/**
 * 字节类型（Bytes）详解
 * 
 * 在 TypeScript 中最接近的类比是 Uint8Array，但有一些重要区别：
 * 
 * 1. 固定长度字节数组（Fixed-size Byte Arrays）
 *    - bytes1 到 bytes32（1到32个字节）
 *    - 类似于 TS 中的：new Uint8Array(32) 但长度固定
 *    - 每个字节是 8 位（bit），可以存储 0-255 的值
 *    - 使用场景：存储小数据，如哈希值（通常是 bytes32）
 * 
 * 2. 动态长度字节数组（Dynamic-size Byte Array）
 *    - bytes（动态长度）
 *    - 类似于 TS 中可变长度的 Uint8Array
 *    - 使用场景：存储任意长度的二进制数据
 * 
 * 3. 使用示例
 */
contract BytesExample {
    // 固定长度
    bytes32 public hash;       // 存储哈希值
    bytes1 public singleByte;  // 存储单个字节

    // 动态长度
    bytes public dynamicBytes; // 动态字节数组

    function bytesDemo() public {
        // 固定长度示例
        singleByte = 0x44;               // 单个字节赋值
        // hash = 0x123456789...;           // 32字节的哈希值

        // 动态长度示例
        dynamicBytes = "Hello";          // 字符串转字节数组
        dynamicBytes.push(0x01);         // 添加单个字节
        uint length = dynamicBytes.length; // 获取长度

        // 字节数组操作
        bytes memory b = new bytes(5);    // 创建固定长度的内存字节数组
        b[0] = 0x01;                      // 设置单个字节
    }

    /**
     * bytes 与 string 的区别：
     * 1. bytes 适合处理原始二进制数据
     * 2. string 适合处理 UTF-8 编码的文本
     * 3. bytes 可以按字节访问，string 不行
     * 4. bytes 操作消耗的 gas 更少
     */
}
