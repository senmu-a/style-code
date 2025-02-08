// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

// TypeScript 中的枚举可以更灵活
// enum OrderStatus {
//     Pending = 'PENDING',    // 可以使用字符串
//     Shipped = 100,         // 可以指定具体数值
//     Delivered = 200,
//     Cancelled = 300
// }

// Solidity 中只能这样：
// enum OrderStatus {
//     Pending,    // 0
//     Shipped,    // 1
//     Delivered,  // 2
//     Cancelled   // 3
// }

/**
 * 使用枚举的好处：
 * 1. 代码更易读（OrderStatus.Pending 比 0 更有意义）
 * 2. 类型安全（不能使用枚举中未定义的值）
 * 3. 减少错误（编译器会检查无效值）
 * 
 * 限制：
 * 1. 不能动态添加值
 * 2. 不能指定具体的数值
 * 3. 值必须是正整数
 */
