import * as types from "../types/user-action-types";
import { login_popup_c } from './popup_actions';
import { get, set } from '../services/ls-service';
import Web3 from 'web3'
import * as activity_actions from './activty_actions';
import * as matic_js from '../web3/matic_actions';
import swapUtils from '../web3/marketplaceUtils';
import {push} from 'connected-react-router';
import maticConfig from "../web3/matic-config";

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
    console.log('called mm login', network);
    
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
    if(network==8995) {
      const balance = await matic_js.getBalanceMatic(accounts[0]);
        //c is 3 for repsten newtwork
        //c is more than 3 for other network
        //so if c is greater than 3 we assume that it is on matic network
      console.log('balance', balance);
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
    }
    // console.log(rpc);
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
  const allowance = await matic_js.depositeToken(userState.accounts[0], userState.add_fund, (hash) => {
    dispatch(activity_actions.add_new_activity(hash, `You added ${userState.add_fund} MANA to Matic Network`))
    dispatch(push('/activity'));
    h = hash;
  })
  console.log('allowance', allowance);
  dispatch(minus_mana(userState.add_fund));
  dispatch(activity_actions.activity_succ(h));
}

export const move_to_matic = (amount) => async (dispatch, getState) => {
  const userState = getState().user;
  let hash;
  const allowance = await matic_js.depositeToken(userState.accounts[0], amount, (h) => {
    dispatch(activity_actions.add_new_activity(h, `You moved 60, -120 to Matic Network`))
    dispatch(push('/activity'));
    hash = h;
  })
  console.log('allowance', allowance);
  dispatch(activity_actions.activity_succ(hash));
}

export const add_fund_change = (value) => ({
  type: types.ADD_FUND_CHANGE,
  value
})

export const depositERC721_token = (id) => async (dispatch, getState) => {
  const userState = getState().user;
  let h1, h2;
  const allowance = await matic_js.depositeERC721Token(userState.accounts[0], id, (hash) => {
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

export const swap_action = (token) => async (dispatch, getState) => {
  const userState = getState().user;
  console.log(userState);
  console.log(userState.accounts[0]);

  const mappedErc20 = '0x75c2297b3a0157aB2815D40D17c1C8b45d5eAF3b';
  const mappedErc721 = '0x4dDf4f09E98309B8Bd1DAdFDa175004eE0662d76';
  const order = '0x468fc9c005382579139846222b7b0aebc9182ba073b2455938a86d9753bfb078';
  const amount = 20;
  const marketplace = '0xd21b65b72680dF167604dd55F7d7F16185AbEbF5';
  const tokenId = token;
  let signature;

  const data = swapUtils.getTypedData({
    orderId: order,
    token2: mappedErc20,
    amount2: amount,
    tokenAddress: mappedErc721,
    spender: marketplace,
    tokenIdOrAmount: tokenId,
    expiration: 0
  })

  await web3.currentProvider.sendAsync({
    method: "eth_signTypedData_v3",
    params: [userState.accounts[0], JSON.stringify(data)],
    from: userState.accounts[0]
  },
  function(err, result) {
      if(err) {
        return console.error(err);
      }
      signature = result.result.substring(2);
      // const r = "0x" + signature.substring(0, 64);
      // const s = "0x" + signature.substring(64, 128);
      // const v = parseInt(signature.substring(128, 130), 16);

      console.log("signature: ", signature)
      console.log(token, dispatch);
      dispatch({type : types.ADD_SIG, token, sig: signature});
      set(token+'', signature);
      const data1 = encode(mappedErc20, result.result, tokenId);
      console.log('data1',data1);

    }
  )
}


function encode(token, sig, tokenIdOrAmount) {
  return web3.eth.abi.encodeParameters(
    ['address', 'bytes', 'uint256'],
    [token, sig, '0x' + tokenIdOrAmount.toString(16)]
  )
}