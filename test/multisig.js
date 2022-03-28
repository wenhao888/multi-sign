const MultiSig = artifacts.require("MultiSigWallet");
const metaCoin = artifacts.require("MetaCoin");
const Web3EthAbi = require('web3-eth-abi');

contract('MultiSign', (accounts) => {
    it('simple test', async () => {
        const metaCoinInstance = await metaCoin.deployed();
        const instance = await MultiSig.deployed();

        const code = Web3EthAbi.encodeFunctionCall({
            name: 'setTotal',
            type: 'function',
            inputs: [{
                type: 'uint256',
                name: '_total'
            }
            ]}, [100]);
        console.log("code", code);

        let invoke = await instance.submitTransaction(metaCoin.address, 0, code , {from: accounts[0]});
        // console.log("invoke", invoke.valueOf())


        invoke = await instance.confirmTransaction(0, {from: accounts[1]});
        console.log("invoke", invoke)


        // invoke = await instance.getConfirmationCount.call(0);
        // console.log("number of confirmations", invoke.toNumber());

        // invoke = await instance.transactions.call(0);
        // console.log("trnsaction detail ", invoke.valueOf());


    });

});