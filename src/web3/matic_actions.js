import config from './matic-config';
import Web3 from 'web3'
import ERC20ABI from './ERC20ABI.json';
import ERC721ABI from './ERC721ABI.json';
import DepositManagerABI from './DepositManagerABI.json';

export const approveToken = async (from, amount= '1000000000000000000', activity) => {
  const web3 = window.web3;
  const tokenContract = new web3.eth.Contract(ERC20ABI, config.ROPSTEN_TEST_TOKEN);
  
  const approveTx = await tokenContract.methods.approve(config.DEPOSITMANAGER_ADDRESS, amount).send({from})
  const approveHash = approveTx.transactionHash;
  console.info("approve hash", approveHash)
  activity(approveHash);
};

export const checkApproval = async (tokenAddress, owner, spender) => {
  const web3 = window.web3 ?
    new Web3(window.web3.currentProvider) :
    new Web3(new Web3("https://ropsten.infura.io/v3/70645f042c3a409599c60f96f6dd9fbc")); //TODO insert custom key

  const erc20Contract = new web3.eth.Contract(ERC20ABI, tokenAddress);
  const allowance = await erc20Contract.methods.allowance(owner, spender).call()
  return allowance;
}

export const depositToken = async (from, amount= '1000000000000000000', activity) => {
  const web3 = window.web3;
  const depositManagerContract = new web3.eth.Contract(DepositManagerABI, config.DEPOSITMANAGER_ADDRESS);

  const depositTx = await depositManagerContract.methods.depositERC20(config.ROPSTEN_TEST_TOKEN, amount).send({from})
  const depositHash = depositTx.transactionHash;
  console.info("deposit hash", depositHash);
  activity(depositHash);
}

export const getBalanceMatic = async (from) => {
  const token = config.MATIC_TEST_TOKEN;
  const web3 = new Web3(config.MATIC_PROVIDER);
  const contract = new web3.eth.Contract(ERC20ABI, token);
  const balance = await contract.methods.balanceOf(from).call();
  return balance;
}


export const getBalanceRopsten = async (from) => {
  const web3 = new Web3(config.PARENT_PROVIDER);
  const contract = new web3.eth.Contract(ERC20ABI, config.ROPSTEN_TEST_TOKEN);
  const balance = await contract.methods.balanceOf(from).call();
  return balance;
}

export const getBalance721Ropsten = async (from) => {
  const token = config.ROPSTEN_ERC721_TEST_TOKEN;
  const web3 = new Web3(config.PARENT_PROVIDER);
  const contract = new web3.eth.Contract(ERC721ABI, token);
  const balance = await contract.methods.balanceOf(from).call();

  const tokenIDs = [];
  for(let i=0; i<balance; i++) {
    tokenIDs.push(await contract.methods.tokenOfOwnerByIndex(from, i).call())
  }
  return tokenIDs;
}

export const getBalance721Matic = async (from) => {
  const token = config.MATIC_ERC721_TEST_TOKEN;
  const web3 = new Web3(config.MATIC_PROVIDER);
  const contract = new web3.eth.Contract(ERC721ABI, token);
  const balance = await contract.methods.balanceOf(from).call();
  const tokenIDs = [];
  for(let i=0; i<balance; i++) {
    tokenIDs.push(await contract.methods.tokenOfOwnerByIndex(from, i).call())
  }
  return tokenIDs;
}

export const depositERC721Token = async (from, tokenId, approve, deposit) => {
  const web3 = window.web3;
  const tokenContract = new web3.eth.Contract(ERC721ABI, config.ROPSTEN_ERC721_TEST_TOKEN);
  const depositManagerContract = new web3.eth.Contract(DepositManagerABI, config.DEPOSITMANAGER_ADDRESS);

  const approveTx = await tokenContract.methods.approve(config.DEPOSITMANAGER_ADDRESS, tokenId).send({from})
  const approveHash = approveTx.transactionHash;
  console.info("approve hash", approveHash)
  approve(approveHash);

  const depositTx = await depositManagerContract.methods.depositERC721(config.ROPSTEN_ERC721_TEST_TOKEN, tokenId).send({from})
  const depositHash = depositTx.transactionHash;
  console.info("deposit hash", depositHash);
  deposit(depositHash);
  
  return;
}
