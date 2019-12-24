import * as types from "../types/user-action-types";
import { login_popup_c } from './popup_actions';
import { get, set } from '../services/ls-service';
import Web3 from 'web3'
import * as activity_actions from './activty_actions';
import * as matic_js from '../web3/matic_actions';
import {push} from 'connected-react-router';
import maticConfig from "../web3/matic-config";
import {getSig} from "../web3/marketplaceUtils";
import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDJ3YaQnD0xlHWKpTe53drIBqd4wV5ANFU",
  authDomain: "marketplace-2de90.firebaseapp.com",
  databaseURL: "https://marketplace-2de90.firebaseio.com",
  projectId: "marketplace-2de90",
  storageBucket: "marketplace-2de90.appspot.com",
  messagingSenderId: "1026915260043",
  appId: "1:1026915260043:web:66ddfa6ae886821b5e268e",
  measurementId: "G-11XKWXQQSM"
};

export const matamask_login = (id) => async (dispatch) => {

    if (!web3) {
      try {
        await typeof window.ethereum;
      } catch (error) {
        window.alert('Please allow Metmask');
        return;
      }
    }

    //check if metamask is installed
    let ethereum = window.ethereum;
    if (typeof window.ethereum === undefined) {
      window.alert('Please install metamask first');
      return;
    }
    
    const accounts = await ethereum.enable();
    web3 = new Web3(window.web3.currentProvider) 
    var network = id || await web3.eth.net.getId();
    
    if(network==3) {
      const balance = await matic_js.getBalanceRopsten(accounts[0]);
      //c is 3 for repsten newtwork
      //c is more than 3 for other network
      //so if c is greater than 3 we assume that it is on matic network
      dispatch({type: types.METAMASK_LOGIN, payload : accounts, network , balance: balance});
      dispatch(login_popup_c());
      dispatch(check_allowance());
      const balanceERC721 = await matic_js.getBalance721Ropsten(accounts[0]);
      dispatch({type : types.ADD_ERC721, erc721 : balanceERC721});
    }
    if(network==15001) {
      const balance = await matic_js.getBalanceMatic(accounts[0]);
        //c is 3 for repsten newtwork
        //c is more than 3 for other network
        //so if c is greater than 3 we assume that it is on matic network
      dispatch({type: types.METAMASK_LOGIN, payload : accounts, network , balance: balance});
      dispatch(login_popup_c());
      const balanceERC721 = await matic_js.getBalance721Matic(accounts[0]);
      const sigs = {};
      balanceERC721.forEach((e) => {
        if(get(e+'')) {
          sigs[e] = get(e+'');
        }
      });
      dispatch({type : types.ADD_ERC721, erc721 : balanceERC721, sigs});
    }
    else {
      alert("Please select supported network");
    }
}

export const check_allowance = () => async (dispatch, getState) => {
  const userState = getState().user;
  const tokenAddress = maticConfig.ROPSTEN_TEST_TOKEN;
  const owner = userState.accounts[0];
  const spender = maticConfig.ROOTCHAIN_ADDRESS ;
  const approved = await matic_js.checkApproval(tokenAddress, owner, spender)
  if(approved === userState.mana) {
    dispatch({type: types.APPROVE_ERC20})
  }
}

export const minus_mana = (mana) => ({
  type: types.MINUS_MANA,
  mana
})

export const remove_erc721 = (id) => ({
  type: types.REMOVE_ERC721,
  id
})

export const approve_token = () => async (dispatch, getState) => {
  // matic_js.approveToken();
  const userState = getState().user;
  if(userState.erc20_approve) return;
  let h;
  await matic_js.approveToken(userState.accounts[0], userState.mana, (hash) => {
    dispatch(activity_actions.add_new_activity(hash, 'You Authorized the Matic Plasma Contact to Operate MANA on your behalf'))
    dispatch(push('/activity'));
    h = hash;
  });
  dispatch({type: types.APPROVE_ERC20 });
  dispatch(activity_actions.activity_succ(h));
}


export const deposit_token = () => async (dispatch, getState) => {
  const userState = getState().user;
  let h;
  const allowance = await matic_js.depositToken(userState.accounts[0], userState.add_fund, (hash) => {
    dispatch(activity_actions.add_new_activity(hash, `You added ${userState.add_fund} MANA to Matic Network`))
    dispatch(push('/activity'));
    h = hash;
  })
  dispatch(minus_mana(userState.add_fund));
  dispatch(activity_actions.activity_succ(h));
}

export const move_to_matic = (amount) => async (dispatch, getState) => {
  const userState = getState().user;
  let hash;
  const allowance = await matic_js.depositToken(userState.accounts[0], amount, (h) => {
    dispatch(activity_actions.add_new_activity(h, `You moved 60, -120 to Matic Network`))
    dispatch(push('/activity'));
    hash = h;
  })
  dispatch(activity_actions.activity_succ(hash));
}

export const add_fund_change = (value) => ({
  type: types.ADD_FUND_CHANGE,
  value
})

export const depositERC721_token = (id) => async (dispatch, getState) => {
  const userState = getState().user;
  let h1, h2;
  const allowance = await matic_js.depositERC721Token(userState.accounts[0], id, (hash) => {
    dispatch(activity_actions.add_new_activity(hash, `You approved tokenID: ${id} ERC721 token`))
    dispatch(push('/activity'));
    h1 = hash;
  },
  (hash) => {
    dispatch(activity_actions.activity_succ(h1));
    dispatch(activity_actions.add_new_activity(hash, `You added tokenID: ${id} ERC721 token to matic network`))
    dispatch(push('/activity'));
    h2 = hash;
  })
  dispatch(remove_erc721(id));
  dispatch(activity_actions.activity_succ(h2));
}

export const generateSellSig = (tokenId, amount) => async (dispatch, getState) => {
  const orderId = '0x468fc9c005382579139846222b7b0aebc9182ba073b2455938a86d9753bfb078'
  const latestBlock = await window.web3.eth.getBlock("latest");
  const expiration = 0;
  
  let sellSig;
  try {
    sellSig = await getSig({
      token1: maticConfig.MATIC_ERC721_TEST_TOKEN,
      amount1: tokenId,
      token2: maticConfig.MATIC_TEST_TOKEN,
      amount2: amount,
      orderId: orderId,
      spender: maticConfig.MARKETPLACE_ADDRESS,
      expiration: expiration,
    })
  } catch (e) {
    console.error(e)
  }

  if (sellSig && sellSig.result) {
    dispatch({type : types.ADD_SIG, token: tokenId, sig: sellSig.result});
    set(tokenId+'', sellSig.result);
    const data1 = encode(maticConfig.MATIC_ERC721_TEST_TOKEN, sellSig.result, tokenId);
    console.log("sellSig", sellSig.result)
    console.log("data1", data1);

    if (!firebase.apps || !firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    await firebase.firestore().collection('nfts').doc(tokenId+"").set({data1});

  } else {
    console.error("Error while signing data");
  }
}

export const buy = (tokenId, amount) => async (dispatch, getState) => {
  const orderId = '0x468fc9c005382579139846222b7b0aebc9182ba073b2455938a86d9753bfb078'
  const latestBlock = await window.web3.eth.getBlock("latest");
  const expiration = 0;
  
  let buySig;
  try {
    buySig = await getSig({
      token1: maticConfig.MATIC_TEST_TOKEN,
      amount1: amount,
      token2: maticConfig.MATIC_ERC721_TEST_TOKEN,
      amount2: tokenId,
      orderId: orderId,
      spender: maticConfig.MARKETPLACE_ADDRESS,
      expiration: expiration,
    })
  } catch (e) {
    console.error(e)
  }

  if (buySig && buySig.result) {
    const data2 = encode(maticConfig.MATIC_TEST_TOKEN, buySig.result, amount);
    console.log("sellSig", sellSig.result)
    console.log(data2);

    if (!firebase.apps || !firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    const storedData = (await firebase.firestore().collection('nfts').doc(tokenId+"").get()).data();
    if (storedData && storedData.data1) {
      const data1 = storedData.data1;
      matic_js.executeSwap(data1, data2, orderId, expiration)
    } else {
      console.error("Error while fetching sell data");
    }
    
  } else {
    console.error("Error while signing data");
  }
}

function encode(token, sig, tokenIdOrAmount) {
  return web3.eth.abi.encodeParameters(
    ['address', 'bytes', 'uint256'],
    [token, sig, '0x' + tokenIdOrAmount.toString(16)]
  )
}
