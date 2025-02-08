// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

/**
 * Solidity 数据类型总览
 * 
 * 1. 值类型（Value Types）
 *    - boolean: true/false
 *    - integer
 *      > int: 有符号整数（可以为负数）
 *      > uint: 无符号整数（不能为负数）
 *      > int8 到 int256, uint8 到 uint256（8的倍数）
 *      > int 等价于 int256, uint 等价于 uint256
 *    - address: 地址类型（20字节）
 *      > address: 普通地址
 *      > address payable: 可支付地址（可以向其转账）
 *    - bytes: 字节类型
 *      > bytes1 到 bytes32
 *      > byte 等价于 bytes1
 *    - string: 字符串
 *    - enum: 枚举
 * 
 * 2. 引用类型（Reference Types）
 *    - array: 数组
 *      > 固定长度: T[k]，例如：uint[5]
 *      > 动态长度: T[]，例如：uint[]
 *    - struct: 结构体
 *      > 自定义的复合类型
 *    - mapping: 映射
 *      > 键值对存储，类似 HashMap
 *      > mapping(KeyType => ValueType)
 * 
 * 3. 存储位置（Data Location）
 *    - storage: 永久存储在区块链上
 *    - memory: 临时存储，函数调用完释放
 *    - calldata: 只读的临时数据存储位置
 * 
 * 4. 特殊说明
 *    - 引用类型必须指定存储位置（storage/memory/calldata）
 *    - 值类型默认存储在栈中
 *    - string 虽然是值类型，但因为是动态大小，也需要指定存储位置
 * 
 * 5. 类型默认值
 *    - bool: false
 *    - int/uint: 0
 *    - address: 0x0
 *    - bytes: 0x0...
 *    - string: ""
 *    - enum: 第一个元素
 *    - array: 所有元素都是默认值的数组
 *    - mapping: 所有可能的键都映射到其值类型的默认值
 *    - struct: 所有成员都是默认值的结构体
 */

