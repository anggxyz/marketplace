import React, { Component } from 'react';
import { connect } from 'react-redux';
import NFTCard from '../common/NFTCard/NFTCard';
import './UserAssets.scss';
import masterNTFList from '../../data/NFTList.json'

class UserAssets extends React.Component {

  get userNfts() {
    return masterNTFList.filter(nft => {
      return this.props.cards.includes(nft.token_id_str)
    })
  }

  render() {
    return (
      <div>
        <div className="marketplace-container container">
          <div className="marketplace-container cards-collection">
            <div className="marketplace-container cards">
              {this.props.isFetching ? (
                <img src={Loader} alt="Loading" className="Loader" />
              ) : (
                this.userNfts.map((e, i) => (
                  <NFTCard {...e} key={i} index={i} normal />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserAssets.propTypes = {};

const mapStateToProps = (state) => {
  const top12 = state.user.erc721;
  return {
    cards: top12,
  };
};

export default connect(
  mapStateToProps
)(UserAssets);
