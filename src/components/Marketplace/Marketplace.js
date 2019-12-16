import React from 'react';
import './marketplace.scss';
import NFTCard from '../common/NFTCard/NFTCard';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Dropdown from 'react-dropdown';
import Loader from '../common/assets/images/Loader.svg';
import cards from '../../data/NFTList.json'

class Marketplace extends React.Component {
  componentWillMount = () => {

  };

  render() {
    return (
      <div>
        <div className="marketplace-container container">
          <div className="marketplace-container cards-collection">
            <div className="marketplace-container cards">
              {this.props.isFetching ? (
                <img src={Loader} alt="Loading" className="Loader" />
              ) : (
                cards.map((e, i) => (
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

Marketplace.propTypes = {};

const mapStateToProps = (state) => {
  const isFetching = state.cards.isFetching;
  return {
    cards: state.cards.cards,
    isFetching,
  };
};

export default connect(
  mapStateToProps
)(Marketplace);
