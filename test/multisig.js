const MultiSig = artifacts.require("MultiSigWallet");
const metaCoin = artifacts.require("MetaCoin");
const Web3EthAbi = require('web3-eth-abi');
const Web3Utils = require('web3-utils');


/**
 * notice owners and the needed approval are specified when we deploy the multi-sign smart contract
 *
 */
contract('MultiSign', (accounts) => {
    it('simple test', async () => {
        const metaCoinInstance = await metaCoin.deployed();
        const instance = await MultiSig.deployed();
        await metaCoinInstance.sendCoin(instance.address,5000);

        const code = Web3EthAbi.encodeFunctionCall({
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "sendCoin",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "sufficient",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, [accounts[2], 600]);

        let codeBytes = Web3Utils.hexToBytes(code);

        invoke = await instance.submitTransaction(metaCoin.address, 0, codeBytes, {from: accounts[0]});
        let transactionId= invoke.logs[0].args[0].toNumber();
        console.log("invoke", invoke)
        console.log("------------------------------")


        invoke = await instance.confirmTransaction(transactionId, {from: accounts[1]});
        console.log("invoke", invoke)
        console.log("------------------------------")


        invoke = await instance.confirmTransaction(transactionId, {from: accounts[2]});
        console.log("invoke", invoke)
        console.log("------------------------------")

        invoke = await metaCoinInstance.getBalance(accounts[2]);
        console.log("invoke", invoke);
    });

});