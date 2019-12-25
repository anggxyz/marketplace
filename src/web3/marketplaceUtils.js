import maticConfig from "../web3/matic-config";
const ethUtils = require('ethereumjs-util')

export async function getSig({ spender, orderId, expiration, token1, amount1, token2, amount2 }) {
  const orderData = Buffer.concat([
    ethUtils.toBuffer(orderId),
    ethUtils.toBuffer(token2),
    ethUtils.setLengthLeft(amount2, 32)
  ]);
  const orderDataHash = ethUtils.bufferToHex(ethUtils.keccak256(orderData));

  const typedDataObject = {
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "contract", type: "address" }
      ],
      TokenTransferOrder: [
        { name: "spender", type: "address" },
        { name: "tokenIdOrAmount", type: "uint256" },
        { name: "data", type: "bytes32" },
        { name: "expiration", type: "uint256" }
      ]
    },
    domain: {
      name: "Matic Network",
      version: "1",
      chainId: maticConfig.CHILD_NETWORK_ID,
      contract: token1
    },
    primaryType: "TokenTransferOrder",
    message: {
      spender: spender,
      tokenIdOrAmount: amount1+"", // convert to string so numbers larger that 53 bits are handled correctly
      data: orderDataHash,
      expiration: expiration
    }
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
