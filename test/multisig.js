const MultiSig = artifacts.require("MultiSigWallet");
const metaCoin = artifacts.require("MetaCoin");
const Web3EthAbi = require('web3-eth-abi');
const Web3Utils = require('web3-utils');


contract('MultiSign', (accounts) => {
    it('simple test', async () => {
        const metaCoinInstance = await metaCoin.deployed();
        let invoke = await metaCoinInstance.owner();
        console.log("meta coin owner is ", invoke);

        const instance = await MultiSig.deployed();


        const code = Web3EthAbi.encodeFunctionCall({
            name: 'setTotal',
            type: 'function',
            inputs: [{
                type: 'uint256',
                name: '_total'
            }]
        }, [600]);
        console.log("code", code);
        let codeBytes = Web3Utils.hexToBytes(code);

        invoke = await instance.submitTransaction(metaCoin.address, 0, codeBytes, {from: accounts[0]});
        let transactionId= invoke.logs[0].args[0].toNumber();
        invoke = await instance.confirmTransaction(transactionId, {from: accounts[1]});
        // console.log("invoke", invoke)

        invoke = await metaCoinInstance.total();
        console.log("invoke", invoke);

    });

});