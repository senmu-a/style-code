import { ethers } from "hardhat";

async function main() {
  try {
    // 部署 PersonInfo 合约
    const PersonInfo = await ethers.getContractFactory("PersonInfo");
    const personInfo = await PersonInfo.deploy();
    
    // 等待交易被挖矿确认
    await personInfo.waitForDeployment();
    
    // 获取合约地址
    const address = await personInfo.getAddress();
    console.log("PersonInfo deployed to:", address);
    
  } catch (error) {
    console.error("Deployment failed:", error);
    throw error;
  }
}

// 执行部署
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
