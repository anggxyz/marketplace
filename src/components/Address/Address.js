import React, { Component } from 'react';
import { connect } from 'react-redux';
import LandCard from '../common/landCard/landCard';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/initActions';
import './address.scss';
import masterNTFList from '../../data/NFTList.json'

class Address extends React.Component {

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
                  <LandCard {...e} key={i} index={i} normal />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Address.propTypes = {};

const mapStateToProps = (state) => {
  const top12 = state.user.erc721;
  return {
    cards: top12,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Address);
