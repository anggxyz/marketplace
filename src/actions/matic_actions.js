import Matic from 'maticjs';
import config from './matic-config';
import Web3 from 'web3'
const token = config.ROPSTEN_TEST_TOKEN // test token address
const from = config.FROM_ADDRESS // from address

// Create object of Matic
const getMatic = () => {
    const web3 = window.web3 ?
        new Web3(window.web3.currentProvider) :
        new Web3(new Web3("https://ropsten.infura.io/v3/70645f042c3a409599c60f96f6dd9fbc")); //TODO insert custom key

    const matic = new Matic({
        maticProvider: web3,
        parentProvider: web3,
        rootChainAddress: config.ROOTCHAIN_ADDRESS,
        syncerUrl: config.SYNCER_URL,
        watcherUrl: config.WATCHER_URL,
    })
    return matic;
}

// matic.wallet = `0x${config.PRIVATE_KEY}` // prefix with `0x`

export const approveToken = (from, amount= '1000000000000000000', activity) => {
    const matic = getMatic()
    // Approve token
    return matic
        .approveERC20TokensForDeposit(token, amount, {
            from,
            onTransactionHash: (hash) => {
                // action on Transaction success
                console.log(hash, 'approve hash'); // eslint-disable-line
                activity(hash);
            },
        })
};

export const depositeToken = (from, amount= '1000000000000000000', activity) => {
    const matic = getMatic()

    // Deposit tokens
    return matic.depositERC20Tokens(token, from, amount, {
        from,
        onTransactionHash: (hash) => {
            // action on Transaction success
            console.log(hash, 'deposite hash'); // eslint-disable-line
            activity(hash);
        },
    });
}

export const transferToken = (from, amount= '1000000000000000000', recipient, activity) => {
    const matic = getMatic()
    const token = config.MATIC_TEST_TOKEN // test token address

    // Send Tokens
    return matic.transferTokens(token, recipient, amount, {
        from,
        // parent: true, // For token transfer on Main network (false for Matic Network)
        onTransactionHash: (hash) => {
            // action on Transaction success
            console.log(hash, 'transfer token') // eslint-disable-line
            activity(hash);
        },
    })
}

export const withdrawToken = (from, amount= '1000000000000000000', activity) => {
    const matic = getMatic()
    return matic
        .startWithdraw(token, amount, {
            from,
            onTransactionHash: (hash) => {
                //  console.log("Withdraw Initiated")
                console.log(hash, 'withdrawToken') // eslint-disable-line
                activity(hash)
            },
        })
}

export const getBalanceMatic = async (from) => {
    const token = config.MATIC_TEST_TOKEN;
    const matic = getMatic()
    const balance = await matic.balanceOfERC20 (
        from, // User address
        token,  // Token address
    )
    console.log('balance of matic', balance);
    
    return balance;
}


export const getBalanceRopsten = async (from) => {
    const matic = getMatic()
    const balance = await matic.balanceOfERC20 (
        from, // User address
        token,  // Token address
    )
    console.log('balance of matic', balance);
    
    return balance;
}