const MultiSig = artifacts.require("MultiSigWallet");
const MetaCoin = artifacts.require("MetaCoin");

contract('MultiSign', (accounts) => {
    it('simple test', async () => {
        const instance = await MultiSig.deployed();
        const metaCoin = await MetaCoin.deployed();
        let invoke = await  instance.submitTransaction.call(metaCoin.address, 0, Buffer.from("hell"));

        console.log("invoke", invoke.valueOf());


    });

});