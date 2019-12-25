import React from 'react';
import caution from '../assets/images/caution.svg';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as popupActions from '../../../actions/popup_actions';
import * as userActions from '../../../actions/user-actions';
import blue_dark from '../assets/images/blue_dark.svg';
import balance from '../assets/images/balance-icon.svg';
import maticConfig from "../../../web3/matic-config";
import './addFund.scss';


class AddFund extends React.Component {

  addFundChange = (ele) => {  
    const value = ele.target.value;
    this.props.userActions.add_fund_change(value);
  }

  render() {

    const {
      mana, 
      erc20_approve,
      add_fund,
      networkID
    } = this.props;

    function roundNumber(rnum, rlength) { 
        var newnumber = Math.floor(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
        return newnumber;
    }

    return (
      <div className="addfund">
        {
          !erc20_approve &&
          <div onClick={this.props.popupActions.add_fund_c} className="caution">
            <div className="caution-img">
              <img src={caution}></img>
            </div>
            <div className="caution-content">
              <p className="unauthorised">Unauthorised </p>
              <p className="para">
                You Need to got <span>Setting</span> and authorised the Matic
                Plasma contact to operate LAND on your behalf before you can list
                it on sale{' '}
              </p>
              <p className="para"></p>
            </div>
          </div>
        }
        <h1 className="addfund-heading">Add fund to matic</h1>
        <div className="addfund-balance">
          <p className="addfund-balance-1">
            Your current balance is{' '}
            <span>
              <img src={blue_dark} />
              <p>{roundNumber(mana/Math.pow(10, 18), 4)}</p>
              {' '}
            </span>
            {' '}
            {
            networkID === maticConfig.MAIN_NETWORK_ID ?
            "in Ropsten Network"
            : "in Matic Network"
            }
          </p>
        </div>
        <p className="addfund-amt">Amount</p>
        <div className="addfund-amtval">
          <div className="addfund-amtval-div">
            <img className="amtval-div-img" src={balance} />
            <p className="amt-div-p">
              <input value={add_fund} onChange={this.addFundChange} type="text" />
            </p>
          </div>
          <div className="addfund-amtval-max">
            <a href="#">MAX</a>
          </div>
        </div>
        {/* <div className="addfund-hr" />
        <p className="addfund-gas">Gas Option</p>
        <div className="addfund-btn">
          <div className="btn-button">
            <p>
              Fast <span>.</span> 0.001 ETH
            </p>
          </div>
          <div className="btn-button">
            <p>
              Medium <span>.</span> 0.001 ETH
            </p>
          </div>
          <div className="btn-button">
            <p>
              Slow <span>.</span> 0.001 ETH
            </p>
          </div>
        </div> */}
        <div className="addfund-sub">
          <a onClick={this.props.popupActions.add_fund_c} href="#" className="sub-cancel">
            CANCEL
          </a>
          <button onClick={this.props.userActions.deposit_token} href="#" className="sub-submit">
            SUBMIT
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const mana = state.user.mana;
  const erc20_approve = state.user.erc20_approve;
  const add_fund = state.user.add_fund;
  const networkID = state.user.network;

  return {
    mana, 
    erc20_approve,
    add_fund,
    networkID
  };
};

const mapDispatchToProps = (dispatch) => ({
  userActions : bindActionCreators(userActions, dispatch),
  popupActions : bindActionCreators(popupActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddFund);

