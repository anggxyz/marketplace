import React from 'react';
import './MaticCard.scss';
import '../Navbar/Navbar.scss';

import Popup from '../common/popup/Popup.js';
import LoginPopup from '../common/popup/loginPopup.js';
import wallet from '../common/assets/images/square.png';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as actions from '../../actions/user-actions'
import masterNFTList from '../../data/NFTList.json'
import MANA from '../common/assets/images/MANA.png';
import WETH from '../common/assets/images/WETH.png';
import ETH from '../common/assets/images/ETH.png';

class MaticCard extends React.Component {
  id = null;
  nftDetails = null;
  isOwner = false;

  constructor(props) {
    super(props);
    this.state = {
      buy: false,
    };
    this.id = this.props.match.params.id;
    this.fetchNftDetails();
    this.isOwner = this.props.userNFTList.includes(this.nftDetails.token_id_str)
  }

  fetchNftDetails() {
    this.nftDetails = masterNFTList.find(nft => this.id == nft.token_id);
    if (!this.nftDetails) {
      console.error("Invalid id");
    }
  }

  buyHandler = () => {
    const id = this.props.match.params.id;
    this.props.actions.buy(parseInt(id), 1);
    // this.setState({ ...this.state, buy: !this.state.buy });
  };

  moveToMatic = () => {
    const id = this.props.match.params.id;
    this.props.actions.depositERC721_token(id);
  }

  generateSellSig = () => {
    const id = this.props.match.params.id;
    this.props.actions.generateSellSig(parseInt(id), 1);
  }

  outHandler= () => {
    this.setState({...this.state, buy: false})
  }

  get price() {
    if (this.nftDetails && this.nftDetails.order_metadata.lowest_sell_order.payment_token_price) {
      return this.nftDetails.order_metadata.lowest_sell_order.payment_token_price;
    }
    return "";
  }
  
  get token() {
    if (this.nftDetails && this.nftDetails.order_metadata.lowest_sell_order.payment_token.symbol) {
      return this.nftDetails.order_metadata.lowest_sell_order.payment_token.symbol;
    }
    return "";
  }

  render() {
    const networkID = this.props.networkID;
    const id = this.props.match.params.id;
    const sigs = this.props.sigs;
    let buyBut = false;
    if(sigs[id]) {
      buyBut = true;
    }
    
    return (
      <div>
        <div onClick={this.outHandler} className="card">
          <div className="row">
            <div className="col-4">
              <img src={this.nftDetails && this.nftDetails.image_url} className="nftImage"></img>
            </div>
            <div className="col-8">
              <div className="card-details">
                <div className="card-details-line1">
                  <div className="para-grey">
                    <p className="para-grey">
                      {(this.nftDetails && this.nftDetails.collections[0].name) || ""}
                    </p>
                  </div>
                  <div className="line-1-div">
                    <div>
                      <div>
                        <p className="para1">{(this.nftDetails && this.nftDetails.name) || ""}</p>
                      </div>
                    </div>
                  </div>
                  <div className="para-grey">
                    <p className="para-grey">
                      {(this.nftDetails && this.nftDetails.description) || ""}
                    </p>
                  </div>
                  <div className="para-grey">
                    <p className="para-grey">
                      Owned by {(this.nftDetails && this.nftDetails.owner.name) || ""}
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
                      <img src={this.token === "MANA" ? MANA : this.token === "WETH" ? WETH : ETH}></img>
                      <span>{this.price}</span>
                    </div>
                  </div>
                  <div className="line-2-btn">
                    {networkID==3 && <div onClick={this.moveToMatic} className="btn-bid">
                      <a href="#">MOVE TO MATIC</a>
                    </div>}
                    <div onClick={this.buyHandler} className="btn-bid">
                      <a >TRANSFER</a>
                    </div>
                    {
                      this.isOwner ? 
                      <div className="btn-buy">
                        <a onClick={this.generateSellSig}>SELL</a>
                      </div>
                      :
                      <div className="btn-buy">
                        <a onClick={this.buyHandler}>BUY</a>
                      </div>

                    }
                  </div>
                </div>
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
                  <span>EVENT</span>
                  <p>Started sale</p>
                  <p>Cancelled sale</p>
                  <p>Started sale</p>
                  <p>Birth</p>
                </div>
                <div className="price">
                  <span>PRICE</span>
                  <p>⏣ 1,500</p>
                  <p>⏣ 2,000</p>
                  <p>⏣ 2,000</p>
                  <p></p>
                </div>
                <div className="from">
                  <span>FROM</span>
                  <p>K-Mart</p>
                  <p>K-Mart</p>
                  <p>K-Mart</p>
                  <p>NullAddress</p>
                </div>
                <div className="to">
                  <span>TO</span>
                  <div>
                    <p>OpenSea-Orders</p>
                  </div>
                  <div>
                    <p>OpenSea-Orders</p>
                  </div>
                  <div>
                    <p>OpenSea-Orders</p>
                  </div>
                  <div>
                    <p>K-Mart</p>
                  </div>
                </div>
                <div className="when">
                  <span>WHEN</span>
                  <p>2 days ago</p>
                  <p>2 days ago</p>
                  <p>4 months ago</p>
                  <p>8 months ago</p>
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
  const sigs = state.user.sigs;
  const userNFTList = state.user.erc721 
  return {
    isSignIn,
    networkID,
    sigs,
    userNFTList
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MaticCard);
