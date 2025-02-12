// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Events {
    mapping(address => uint256) public _balances;
    //EVM  日志的抽象 Ether.js交互
    //带有indexed属性的这个状态是存储在 一个 topics
    // 0 索引
    // {
    //     topics:[
    //         0:函数方法的签名
    //         1.indexed
    //         2.to
    //         3.最后indexed
    //     ]
    // }
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    function _transfer(address from, address to, uint256 amount) external {
        //转账地址转一些基础的代币
        _balances[from] = 1000000;
        _balances[from] -= amount;
        _balances[to] += amount;
        emit Transfer(from, to, amount);
    }
}

//事件过滤（前端）

// const filter = contract.filters.EVENT_NAME( ...args )

// contract.filters.Transfer(myAddress)
// contract.filters.Transfer(null, myAddress)
// contract.filters.Transfer(myAddress, otherAddress)
// contract.filters.Transfer(null, [ myAddress1, myAddress2 ])

// var event = clientReceipt.Deposit(function(error, result) {
//     if (!error)
//         console.log(result);
// });

// {
//     "returnValues": {
//         "_from": "0x1111…FFFFCCCC",
//         "_id": "0x50…sd5adb20",
//         "_value": "0x420042"
//     },
//     "raw": {
// 数据上链
//         "data": "0x7f…91385",
//         "topics": ["0xfd4…b4ead7", "0x7f…1a91385"]
//     }
//  }
