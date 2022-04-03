const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");
const MultiSig = artifacts.require("MultiSigWallet");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);

  deployer.deploy(MultiSig, [accounts[0], accounts[1], accounts[2]], 3);
};
