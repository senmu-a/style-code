// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract MetaCoin is ERC20 {
  // 给代币起个名字
  string public constant NAME = "senmuERC20Token";
  // 给代币一个缩写
  string public constant SYMBOL = "SM";
  // 初始发行量
  uint256 public constant INITIAL_SUPPLY = 10000;
  constructor() ERC20(NAME, SYMBOL) {
    /**
     * 注意：每一个 ERC-20 代币都通过自己的业务逻辑来决定代币管理。 
     * 例如，一个固定供应总量的合约可能只在构造函数中调用 _mint，而从不调用 _burn。
     *  一个销售代币的合约 将在支付时调用 _mint，并大概在某个时间点调用 _burn， 以避免过快的通货膨胀。
     */
    // 初始化铸造 10000 枚代币
    _mint(msg.sender, INITIAL_SUPPLY);
  }

  /**
   * 分位数设置为0，不拆分代币
   */
  function decimals() public view virtual override returns (uint8) {
    return 0;
  }
}
