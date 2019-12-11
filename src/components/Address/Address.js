import React, { Component } from 'react';
import { connect } from 'react-redux';
import LandCard from '../common/landCard/landCard';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/initActions';
import './address.scss';
import cards from '../../data/NFTList.json'

class Address extends React.Component {

  cardsUI = (card) => (
    <LandCard {...{
      "name":"Tayra",
      "id": card,
      "months":"9.8",
      "num":"0.3.1",
      "x":"9.17",
      "y":"0.86",
      "green":true,
      "blue":false,
      "manaSymbol":true,
      "mana":"72-559-2671"}} my={true} key={card} index={card} normal />
  )

  render() {
    return (
      <div>
        <div className="marketplace-container container">
          <div className="marketplace-container cards-collection">
            <div className="marketplace-container cards">
              {this.props.isFetching ? (
                <img src={Loader} alt="Loading" className="Loader" />
              ) : (
                cards.slice(10,12).map((e, i) => (
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
