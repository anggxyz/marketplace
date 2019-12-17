const sigUtils = require('./marketplaceUtils.js')
const Web3 = require('web3');
const config = require('./swap_config.js')

var web3 = new Web3(config.provider);

const wallet = web3.eth.accounts.wallet;

const marketplace = require('./marketplace.json');
const Marketplace = new web3.eth.Contract(marketplace.abi, config.marketplace)

function encode(token, sig, tokenIdOrAmount) {
    return web3.eth.abi.encodeParameters(
        ['address', 'bytes', 'uint256'],
        [token, sig, '0x' + tokenIdOrAmount.toString(16)]
    )
}

export default (wallet) => {
    const obj1 = sigUtils.getSig({
        spender: config.marketplace,
        orderId: config.orderId,
        expiration: config.expiration,
        from: wallet,
        token1: config.erc20,
        amount1: config.amount,
        token2: config.erc721,
        amount2: config.tokenid
    })
    
    const obj2 = sigUtils.getSig({
        spender: config.marketplace,
        orderId: config.orderId,
        expiration: config.expiration,
        from: wallet,
        token2: config.erc20,
        amount2: config.amount,
        token1: config.erc721,
        amount1: config.tokenid
    })

    Marketplace.methods.executeOrder(
        encode(obj1.tokenAddress, obj1.sig, obj1.tokenIdOrAmount),
        encode(obj2.tokenAddress, obj2.sig, obj2.tokenIdOrAmount),
        config.orderId,
        config.expiration,
        wallet
    ).send({
        from: wallet, // can be called from any address (as long as the signatures are authentic)
        gas: 6721975
    }).on('transactionHash', function (transactionHash) { console.info("swap tx - \t" + transactionHash) })
}
