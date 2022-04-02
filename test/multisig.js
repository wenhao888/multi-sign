const MultiSig = artifacts.require("MultiSigWallet");
const metaCoin = artifacts.require("MetaCoin");
const Web3EthAbi = require('web3-eth-abi');
const Web3Utils = require('web3-utils');



contract('MultiSign', (accounts) => {
    it('simple test', async () => {
        const metaCoinInstance = await metaCoin.deployed();
        const instance = await MultiSig.deployed();
        const code = Web3EthAbi.encodeFunctionCall({
            name: 'add',
            type: 'function',
            inputs: [{
                type: 'uint256',
                name: 'a'
            },
                {
                    type: 'uint256',
                    name: 'b'
                }
            ]}, [200,600]);
        console.log("code", code);
        let codeBytes = Web3Utils.hexToBytes(code);

        let invoke = await instance.submitTransaction(metaCoin.address, 0, codeBytes , {from: accounts[0]});
        // console.log("invoke", invoke)


        console.log("--------------------------")

        invoke = await instance.confirmTransaction(0, {from: accounts[1]});
        console.log("invoke", invoke)
        //
        // invoke = await instance.parameter();
        // console.log("invoke", invoke)

        invoke = await metaCoinInstance.total();
        console.log("invoke", invoke);
    });

});