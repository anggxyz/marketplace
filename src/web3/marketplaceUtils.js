const ethUtils = require('ethereumjs-util')

export async function getSig({
  spender,
  orderId,
  expiration,
  token1,
  amount1,
  token2,
  amount2
}) {
  const orderData = Buffer.concat([
    ethUtils.toBuffer(orderId),
    ethUtils.toBuffer(token2),
    ethUtils.setLengthLeft(amount2, 32)
  ])
  const orderDataHash1 = ethUtils.keccak256(orderData)
  const orderDataHash = '0x' + orderDataHash1.toString('hex');
  
  const typedData = getTransferTypedData({
    spender: spender,
    data: orderDataHash,
    tokenIdOrAmount: amount1,
    tokenAddress: token1,
    expiration: expiration
  })

  const sig = await signTypedData(typedData)
  return sig;
}

function getTransferTypedData({
  tokenAddress,
  spender,
  tokenIdOrAmount,
  data,
  expiration
}) {
  return {
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
      chainId: 15001,
      contract: tokenAddress
    },
    primaryType: "TokenTransferOrder",
    message: {
      spender,
      tokenIdOrAmount,
      data,
      expiration
    }
  }
}

async function signTypedData(data) {
  const from = (await window.web3.eth.getAccounts())[0]
  const params = [from, JSON.stringify(data)]
  const method = 'eth_signTypedData_v3'
  // promise
  return new Promise((resolve, reject) => {
    window.web3.currentProvider.sendAsync(
      {
        method,
        params,
        from
      },
      (err, result) => {
        const e = err || (result && result.error)
        if (e) {
          reject(e)
        } else {
          resolve(result)
        }
      }
    )
  })
}
