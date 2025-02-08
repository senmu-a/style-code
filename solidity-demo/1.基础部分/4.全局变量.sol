// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

/**
 * Solidity 全局变量详解
 * 全局变量是 Solidity 内置的特殊变量，在任何合约中都可以直接使用
 */
contract GlobalVariablesExample {
    // 用于记录合约状态
    address public lastCaller;    // 最后调用者地址
    uint public lastCallTime;     // 最后调用时间
    uint public lastBlockNumber;  // 最后调用时的区块号
    uint public lastGasPrice;     // 最后调用时的 gas 价格
    bytes public lastCallData;    // 最后调用时的数据

    /**
     * 1. Block 相关的全局变量
     */
    function getBlockInfo() public view returns (
        uint number,        // 当前区块号
        uint timestamp,     // 当前区块时间戳
        uint difficulty,    // 当前区块难度
        uint gaslimit,      // 当前区块 gas 上限
        address coinbase    // 矿工地址
    ) {
        return (
            block.number,
            block.timestamp,
            block.prevrandao, // block.difficulty 已弃用
            block.gaslimit,
            block.coinbase
        );
    }

    /**
     * 2. Message 相关的全局变量
     */
    function recordCall() public payable {
        // msg 相关变量
        lastCaller = msg.sender;     // 调用者地址
        lastCallTime = block.timestamp;
        lastBlockNumber = block.number;
        lastGasPrice = tx.gasprice;  // 当前 gas 价格
        lastCallData = msg.data;     // 调用数据
        // - msg.gas (uint):剩余的gas量
        // - msg.sender (address):消息的发送方(调用者)
        // - msg.sig (bytes4):calldata的前四个字节(即函数标识符)
        // - msg.value (uint):所发送的消息中的Wei （以太坊激励体系内最小的虚拟数字货币单位）数量
    }

    /**
     * 3. Transaction 相关的全局变量
     */
    function getTransactionInfo() public view returns (
        uint gasPrice,     // gas 价格
        address origin     // 交易发起人
    ) {
        return (
            tx.gasprice,
            tx.origin      // 注意：tx.origin 与 msg.sender 的区别
        );
    }

    /**
     * tx.origin 和 msg.sender 的区别
     * 
     * 1. tx.origin
     *    - 永远是交易的原始发起人（外部账户地址）
     *    - 不管经过多少次合约调用，都不会改变
     *    - 类似于"包裹的最初发件人"
     * 
     * 2. msg.sender
     *    - 是当前函数调用的直接发送者
     *    - 可能是外部账户地址，也可能是合约地址
     *    - 会随着合约调用链的变化而改变
     *    - 类似于"当前递送包裹的人"
     * 
     * 3. 调用链示例
     *    用户A -> 合约B -> 合约C
     *    在合约C中：
     *      - tx.origin = 用户A（原始发起人）
     *      - msg.sender = 合约B（直接调用者）
     * 
     * 4. 安全建议
     *    - 使用 msg.sender 进行身份验证更安全
     *    - 避免使用 tx.origin 做权限控制（容易受到钓鱼攻击）
     *    - msg.sender 更准确地反映调用关系
     */

    /**
     * 4. 实用的全局函数
     */
    function utilityFunctions(bytes32 hash) public view returns (
        address recoveredAddress,    // 从签名恢复地址
        bytes32 keccakHash,         // keccak256 哈希
        uint gasLeft                 // 剩余 gas
    ) {
        // 这里只是演示，实际使用需要有效的签名
        recoveredAddress = address(0);  
        keccakHash = keccak256(abi.encodePacked("Hello"));
        gasLeft = gasleft();
    }

    /**
     * 全局变量使用注意事项：
     * 1. block.timestamp 可能被矿工略微操纵
     * 2. 使用 tx.origin 进行身份认证是不安全的
     * 3. msg.sender 在合约调用合约时会改变
     * 4. msg.value 只在 payable 函数中可用
     */
    
    // 接收以太币的回退函数
    receive() external payable {
        lastCaller = msg.sender;
        lastCallTime = block.timestamp;
    }
}
