/**
 * 实现一个 简单的去中心化存款合约 (DeFi Deposit Contract)
 * 功能：
 *  1. 允许用户存款（ETH）
 *  2. 允许用户提款（ETH）
 *  3. 仅允许 owner 提取所有资金
 *  4. 记录用户存款余额
 * 要求：
 *  1. 使用 Solidity 0.8.x 版本
 *  2. 需要包含 deposit、withdraw 和 ownerWithdraw 方法
 *  3. 记录每个用户的存款金额
 */
// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract DepositContract {
  address private owner; // owner 合约部署者

  // 存款年化利率 5%
  uint256 private constant ANNUAL_INTEREST_RATE = 5;

  // 添加存款时间映射
  mapping(address => uint256) private depositTimestamps;

  mapping(address => uint256) private balances; // map 表示用户地址和余额的映射

  uint256 private currentVersion;  // 版本号
  mapping(address => uint256) private balanceVersion;  // 记录每个地址的余额版本

  // 添加事件来跟踪存款
  event Deposit(address indexed user, uint256 amount);

  // 添加事件来跟踪提款
  event Withdraw(address indexed user, uint256 amount);

  // 添加一个事件来记录余额重置
  event BalancesReset(address indexed by);

  // 添加 SM 代币合约接口
  IERC20 public smToken;

   // 添加代币余额映射
  mapping(address => uint256) private tokenBalances;

  // 添加代币相关事件
  event TokenDeposit(address indexed user, uint256 amount);
  event TokenWithdraw(address indexed user, uint256 amount);

  constructor(address _smTokenAddress) {
    owner = msg.sender;
    smToken = IERC20(_smTokenAddress);
  }

  // 用户存款 ETH
  function deposit() public payable {
    require(msg.value > 0, "Deposit amount must be greater than 0");
    require(msg.sender.balance >= msg.value, "Insufficient ETH balance");

    // 将 Wei 转换为 ETH 单位后存储
    uint256 amountInEth = msg.value / 1 ether;

    // 更新存款时间戳
    depositTimestamps[msg.sender] = block.timestamp;
    
    // 更新用户余额版本号为当前版本
    balanceVersion[msg.sender] = currentVersion;
    balances[msg.sender] += amountInEth;

    emit Deposit(msg.sender, msg.value);
  }

   // 添加代币存款功能
  function depositToken(uint256 _amount) public {
    require(_amount > 0, "Deposit amount must be greater than 0");
    require(
        smToken.balanceOf(msg.sender) >= _amount,
        "Insufficient token balance"
    );

    require(
        smToken.transferFrom(msg.sender, address(this), _amount),
        "Token transfer failed"
    );

    tokenBalances[msg.sender] += _amount;
    depositTimestamps[msg.sender] = block.timestamp;
    balanceVersion[msg.sender] = currentVersion;

    emit TokenDeposit(msg.sender, _amount);
  }

  function withdraw(uint256 _amountInEth) public {
    // 检查用户余额版本是否有效
    require(balanceVersion[msg.sender] == currentVersion, "Balance has been reset");

    // 计算可提取的总额（本金 + 利息）
    uint256 interest = calculateInterest(msg.sender);
    uint256 totalBalance = balances[msg.sender] + interest;
    
    require(totalBalance >= _amountInEth, "Insufficient balance");
    
    uint256 amountInWei = _amountInEth * 1 ether;

    if (_amountInEth <= balances[msg.sender]) {
      // 如果提款金额小于等于本金
      balances[msg.sender] -= _amountInEth;
    } else {
      // 如果提款金额大于本金（包含了利息），则重置余额
      balances[msg.sender] = 0;
      // 重置存款时间
      depositTimestamps[msg.sender] = block.timestamp;
    }
    
    payable(msg.sender).transfer(amountInWei); // 该合约向用户转账（实际转账的操作）

    emit Withdraw(msg.sender, amountInWei);
  }

  // 添加代币提款功能
  function withdrawToken(uint256 _amount) public {
    require(balanceVersion[msg.sender] == currentVersion, "Balance has been reset");
    
    uint256 tokenInterest = calculateTokenInterest(msg.sender);
    uint256 totalTokenBalance = tokenBalances[msg.sender] + tokenInterest;
    
    require(totalTokenBalance >= _amount, "Insufficient token balance");

    if (_amount <= tokenBalances[msg.sender]) {
        tokenBalances[msg.sender] -= _amount;
    } else {
        tokenBalances[msg.sender] = 0;
        depositTimestamps[msg.sender] = block.timestamp;
    }

    require(
        smToken.transfer(msg.sender, _amount),
        "Token transfer failed"
    );

    emit TokenWithdraw(msg.sender, _amount);
  }

  function ownerWithdraw() public {
    require(msg.sender == owner, "Only owner can withdraw");
    
    uint256 amount = address(this).balance;
    uint256 tokenAmount = smToken.balanceOf(address(this));

    currentVersion++; // 增加版本号

    if (tokenAmount > 0) {
        require(smToken.transfer(owner, tokenAmount), "Token transfer failed");
    }

    if (amount > 0) {
        payable(owner).transfer(amount);
    }
    emit Withdraw(owner, amount);
  }

  // 计算利息的函数
  function calculateInterest(address user) private view returns (uint256) {
    if (balances[user] == 0 || balanceVersion[user] < currentVersion) {
        return 0;
    }

    // 计算存款时间（秒）
    uint256 timeElapsed = block.timestamp - depositTimestamps[user];
    
    // 将秒转换为年
    // 1年 = 365 * 24 * 60 * 60 = 31536000 秒
    uint256 yearsElapsed = timeElapsed / 31536000;
    
    // 计算利息: 本金 * 年化利率 * 年数 / 100
    uint256 interest = (balances[user] * ANNUAL_INTEREST_RATE * yearsElapsed) / 100;
    
    return interest;
  }

  // 添加代币利息计算函数
  function calculateTokenInterest(address user) private view returns (uint256) {
    if (tokenBalances[user] == 0 || balanceVersion[user] < currentVersion) {
        return 0;
    }

    uint256 timeElapsed = block.timestamp - depositTimestamps[user];
    uint256 yearsElapsed = timeElapsed / 31536000;
    uint256 interest = (tokenBalances[user] * ANNUAL_INTEREST_RATE * yearsElapsed) / 100;
    
    return interest;
  }

  // 添加获取用户当前版本号的函数
  function getUserVersion(address account) public view returns (uint256) {
      return balanceVersion[account];
  }

  // 查询ETH余额的方法
  function getBalance(address account) public view returns (uint256) {
    if (balanceVersion[account] < currentVersion) {
        return 0;  // 如果版本号低于当前版本，返回0
    }
    return balances[account] + calculateInterest(account);
  }

  // 添加代币余额查询功能
  function getTokenBalance(address account) public view returns (uint256) {
    if (balanceVersion[account] < currentVersion) {
        return 0;
    }
    return tokenBalances[account] + calculateTokenInterest(account);
  }

  // 添加查看当前利息的方法
  function getCurrentInterest() public view returns (uint256) {
    return calculateInterest(msg.sender);
  }
}