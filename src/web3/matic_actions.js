import Matic from 'maticjs';
import config from './matic-config';
import Web3 from 'web3'
import contractABI from './contractABI';
const token = config.ROPSTEN_TEST_TOKEN // test token address

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
                console.log('approve hash', hash); // eslint-disable-line
                activity(hash);
            },
        })
};

export const checkApproval = async (tokenAddress, owner, spender) => {
    const web3 = window.web3 ?
        new Web3(window.web3.currentProvider) :
        new Web3(new Web3("https://ropsten.infura.io/v3/70645f042c3a409599c60f96f6dd9fbc")); //TODO insert custom key
    
    const erc20Contract = new web3.eth.Contract(contractABI, tokenAddress);
    const allowance = await erc20Contract.methods.allowance(owner, spender).call()
    return allowance;
}

export const depositeToken = (from, amount= '1000000000000000000', activity) => {
    const matic = getMatic()

    // Deposit tokens
    return matic.depositERC20Tokens(token, from, amount, {
        from,
        onTransactionHash: (hash) => {
            // action on Transaction success
            console.log('deposite hash', hash); // eslint-disable-line
            activity(hash);
        },
    });
}

export const getBalanceMatic = async (from) => {
    const token = config.MATIC_TEST_TOKEN;
    const matic = getMatic()
    const balance = await matic.balanceOfERC20 (
        from, // User address
        token,  // Token address
    )
    
    return balance;
}


export const getBalanceRopsten = async (from) => {
    const matic = getMatic()
    const balance = await matic.balanceOfERC20 (
        from, // User address
        token,  // Token address
    )
    
    return balance;
}

export const getBalance721Ropsten = async (from) => {
    const token = config.ROPSTEN_ERC721_TEST_TOKEN;
    const matic = getMatic()
    const balance = await matic.balanceOfERC721 (
        from, // User address
        token,  // Token address
    )
    const tokenIDs = [];
    for(let i=0; i<balance; i++) {
        tokenIDs.push(await matic.tokenOfOwnerByIndexERC721(from, token, i))        
    }
    return tokenIDs;
}

export const getBalance721Matic = async (from) => {
    const token = config.MATIC_ERC721_TEST_TOKEN;
    const matic = getMatic()
    const balance = await matic.balanceOfERC721 (
        from, // User address
        token,  // Token address
    )
    const tokenIDs = [];
    for(let i=0; i<balance; i++) {
        tokenIDs.push(await matic.tokenOfOwnerByIndexERC721(from, token, i))        
    }
    return tokenIDs;
}

export const depositeERC721Token = async (from, tokenId, approve, deposite) => {
    const token = config.ROPSTEN_ERC721_TEST_TOKEN;
    const matic = getMatic()
    await matic
        .approveERC721TokenForDeposit(token, tokenId, {
            from,
            onTransactionHash: (hash) => {
            // action on Transaction success
            approve(hash);
            },
        })

    await matic.depositERC721Tokens(token, from, tokenId, {
        from,
        onTransactionHash: (hash) => {
            // action on Transaction success
            deposite(hash);
        },
    })
    return;
}
