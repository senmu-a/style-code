1.abi json文件
合约地址、合约的json方法描述、setinfo return
2.typechains 对应ts类型方法 hardhat自带
3.链接钱包
强行弹窗
const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
});
静默链接 断开链接没有真正的断开
const accounts = (await this.provider.request({ method: 'eth_accounts' })) as string[]
4.获取钱包的余额
const balance = await window.ethereum.request({
    method: 'eth_getBalance',
    params: [address, 'latest'],
});
5. 部署合约
const provider = new ethers.BrowserProvider(window.ethereum);
signer = await provider.getSigner();
contract = new ethers.Contract(contractAddress, contractABI, signer);
6. 监听合约的事件
contract.addListener('Instructor', (name, age) => {
    const eventItem = document.createElement('div');
    eventItem.className = 'event-item';
    eventItem.textContent = `新事件: 名字 = ${name}, 年龄 = ${age}`;
    eventList.insertBefore(eventItem, eventList.firstChild);
});
7. 调用合约方法
const tx = await contract.setInfo(name, parseInt(age));
infoDisplay.innerHTML = '交易已发送，等待确认...';
await tx.wait();
8.loading可关闭


通过传统的HTML+JS完成一个小型的dapp 能够写合约读合约监听事件
简单熟悉一下web3-react、wagmi、connectkit、rainbowkit