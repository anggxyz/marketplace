import * as actionTypes from '../types/user-action-types'


const initialState = {
  accounts: '',
  network: 1,
  show_login_popup : false,
  is_sign_in: false,
  mana: 0,
  erc721: [],
  sigs : {},
  add_fund : 0,
  erc20_approve : false,
  web3: {}
}

const loginFormReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.METAMASK_LOGIN : {
      const newState = {...state};
      newState.accounts = actions.payload;
      newState.network = actions.network;
      newState.mana = actions.balance;
      newState.add_fund = actions.balance;
      newState.is_sign_in = true;
      return newState;
    }

    case actionTypes.ADD_ERC721 : {
      const newState = {...state};
      newState.erc721 = [...actions.erc721];
      if(actions.sigs) newState.sigs = {...actions.sigs};
      return newState;
    }

    case actionTypes.ADD_SIG : {
      const newState = {...state};
      if(actions.sig) newState.sigs = {...actions.sigs, [actions.token] : actions.sig};
      return newState;
    }

    case actionTypes.MINUS_MANA : {
      const minus = actions.mana;
      const newState = {...state};
      newState.mana = newState.mana - minus;
      return newState;
    }

    case actionTypes.REMOVE_ERC721 : {
      const id = actions.id;
      const newState = {...state};
      newState.erc721 = newState.erc721.filter((e) => id!==e)
      return newState;
    }

    case actionTypes.GET_WEB3 : {
      const web3 = actions.web3;
      const newState = {...state};
      newState.web3 = web3;
      return newState;
    }

    case actionTypes.APPROVE_ERC20 : {
      const newState = {...state};
      newState.erc20_approve = true;
      return newState;
    }

    case actionTypes.SHOW_LOGIN_POPUP : {
      const newState = {...state};
      newState.show_login_popup = true;
      return newState;
    }

    case actionTypes.HIDE_LOGIN_POPUP : {
      const newState = {...state};
      newState.show_login_popup = false;
      return newState;
    }

    case actionTypes.ADD_FUND_CHANGE : {
      const newState = {...state};
      newState.add_fund = actions.value;
      return newState;
    }

    default:
      return state
  }
}

export default loginFormReducer 
