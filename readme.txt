const code = Web3EthAbi.encodeFunctionCall(
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_total",
                        "type": "uint256"
                    }
                ],
                "name": "setTotal",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }, [100]);
        console.log("code", code);