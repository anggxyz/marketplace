import React from 'react';
import './MaticCard.scss';
import '../Navbar/Navbar.scss';
import { connect } from 'react-redux'
import * as popupActions from '../../actions/popup_actions';

import Popup from '../common/popup/Popup.js';
import LoginPopup from '../common/popup/loginPopup.js';
import img from '../common/assets/images/img.png';
import Icons from '../../services/icon-service';
import { Link } from 'react-router-dom';
const Map = Icons['fa-map-marker'];
import wallet1 from '../common/assets/images/wallet.svg';
import walletConnect from '../common/assets/images/walcon.svg';
import metamask from '../common/assets/images/metamask.svg';
import portis from '../common/assets/images/portis.svg';
import wallet from '../common/assets/images/square.png';
import balance from '../common/assets/images/balance-icon.svg';
import location from '../common/assets/images/location.svg';
import road from '../common/assets/images/road.svg';
import { bindActionCreators } from 'redux';

class MaticCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buy: false,
    };
  }
  buyHandler = () => {
    this.setState({ ...this.state, buy: !this.state.buy });
  };

  outHandler= () => {
    this.setState({...this.state, buy: false})
  }

  buyBid = () => {
    if(!this.props.isSignIn)
      this.props.popupActions.login_popup_o();
  }

  render() {
    const networkID = this.props.networkID;
    return (
      <div>
        <div onClick={this.outHandler} className="card">
          <div className="card-img-block">
            {this.state.buy && (
              <div className="connect">
                <Popup>
                  <LoginPopup />
                </Popup>
              </div>
            )}
            <div className="card-img">
              <img ></img>
            </div>
          </div>
          <div className="card-details">
            <div className="card-details-line1">
              <div className="line-1-div">
                <div>
                  <div>
                    <p className="para1">Private road Connection</p>
                  </div>
                  <div className="para-img">
                    <span className="map">
                      <Map size="30px" />
                    </span>
                    <p>-73, -112</p>
                  </div>
                </div>
                <div className="own-by">
                  <div>
                    <span>
                      <p>Owned by</p>
                    </span>
                    <img src={wallet}></img>
                  </div>
                </div>
              </div>
              <div className="para-grey">
                <p className="para-grey">
                  Most Valuable parcel for this price on market{' '}
                </p>
              </div>
            </div>
          </div>
          <div className="card-details-line2">
            <div className="line2">
              <div className="line2-price">
                <div>
                  <p>Price</p>
                </div>
                <div className="val">
                  <img src={balance}></img>
                  <span>1000</span>
                </div>
              </div>
              <div className="line2-time">
                <p className="para-white">Time Left</p>
                <p className="para-grey">Expire in 29 Days</p>
              </div>
              <div className="line-2-btn">
                {networkID==3 && <div onClick={this.moveToMatic} className="btn-bid">
                  <a href="#">MOVE TO MATIC</a>
                </div>}
                <div onClick={this.buyHandler} className="btn-bid">
                  <a onClick={this.buyBid}>BID</a>
                </div>
                <div onClick={this.buyHandler} className="btn-buy">
                  <a onClick={this.buyBid}>BUY</a>
                </div>
              </div>
            </div>
          </div>
          <div className="highlight">
            <h1>Highlights</h1>
            <div className="high">
              <div className="block">
                <img src={road}></img>
                <span className="text">
                  <p className="text-1">Road</p>
                  <p className="text-2">Adjacent</p>
                </span>
              </div>
              <div className="block">
                <img src={road}></img>
                <span className="text">
                  <p className="text-1">Road</p>
                  <p className="text-2">Adjacent</p>
                </span>
              </div>
              <div className="block">
                <img src={road}></img>
                <span className="text">
                  <p className="text-1">Road</p>
                  <p className="text-2">Adjacent</p>
                </span>
              </div>
              <div className="block">
                <img src={road}></img>
                <span className="text">
                  <p className="text-1">Road</p>
                  <p className="text-2">Adjacent</p>
                </span>
              </div>
            </div>
          </div>
          <div className="card-details-line3">
            <div className="trans-p">
              <p>Trasnsaction History</p>
            </div>
            <div className="tran-parrent">
              <div className="tran-container">
                <div className="price">
                  <span>PRICE</span>
                  <p>⏣ 2,000</p>
                </div>
                <div className="when">
                  <span>WHEN</span>
                  <p>over one year</p>
                </div>
                <div className="from">
                  <span>FROM</span>
                  <p>Auction</p>
                </div>
                <div className="to">
                  <span>TO</span>
                  <div>
                    <img src={wallet}></img>
                    <p>0xa0e7d....969c4a2</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const isSignIn = state.user.is_sign_in;
  const networkID = state.user.network;
  return {
    isSignIn,
    networkID
  };
};

const mapDispatchToProps = (dispatch) => ({
  popupActions: bindActionCreators(popupActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MaticCard);
