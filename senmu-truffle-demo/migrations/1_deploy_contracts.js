const MetaCoin = artifacts.require('MetaCoin');

module.exports = function (deployer) {
  // deployment steps
  deployer.deploy(MetaCoin);
}