const ethUtils = require('ethereumjs-util')
const sigUtils = require('eth-sig-util')

exports.getTypedData = function ({
    orderId, token2, amount2, tokenAddress, spender, tokenIdOrAmount, expiration
}){
    const data = getOrderData(orderId, token2, amount2);
    console.log("data: ", data)
    return getTransferTypedData({
      tokenAddress, spender, tokenIdOrAmount, data, expiration
    });
}

function getOrderData({
    orderId, token2, amount2
}) {
    const orderData = Buffer.concat([
        ethUtils.toBuffer(orderId),
        ethUtils.toBuffer(token2),
        ethUtils.setLengthLeft(amount2, 32)
    ]);
    const orderDataHash = ethUtils.keccak256(orderData)
    return orderDataHash;
}

function getTransferTypedData ({
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
      chainId: 8995,
      contract: tokenAddress
    },
    primaryType: "TokenTransferOrder",
    message: {
    }
  }
}
