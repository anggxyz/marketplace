const ethUtils = require('ethereumjs-util')

export async function getSig({ spender, orderId, expiration, token1, amount1, token2, amount2 }) {
  const domain = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "contract", type: "address" }
  ];
  const tokenTransferOrder = [
    { name: "spender", type: "address" },
    { name: "tokenIdOrAmount", type: "uint256" },
    { name: "data", type: "bytes32" },
    { name: "expiration", type: "uint256" }
  ];
  const orderData = Buffer.concat([
    ethUtils.toBuffer(orderId),
    ethUtils.toBuffer(token2),
    ethUtils.setLengthLeft(amount2, 32)
  ]);
  const orderDataHash1 = ethUtils.keccak256(orderData);
  const orderDataHash = '0x' + orderDataHash1.toString('hex');

  const domainData = {
    name: "Matic Netwoork",
    version: "1",
    chainId: 15001,
    verifyingContract: token1
  };

  var message = {
    spender: spender,
    tokenIdOrAmount: amount1,
    data: orderDataHash,
    expiration: expiration
  };

  const typedDataObject = {
    types: {
      EIP712Domain: domain,
      TokenTransferOrder: tokenTransferOrder
    },
    domain: domainData,
    primaryType: "TokenTransferOrder",
    message: message
  }

  const signer = (await window.web3.eth.getAccounts())[0];
  return new Promise((res, rej) => {
    window.web3.currentProvider.sendAsync(
      {
        method: "eth_signTypedData_v3",
        params: [signer, JSON.stringify(typedDataObject)],
        from: signer
      }, 
      function(err, result) {
        if (err || result.error) {
          console.error(result);
          return rej(error);
        }
        res(result)
      }
    );
  })
}
