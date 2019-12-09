import React from 'react';
import './marketplace.scss';
import LandCard from '../common/landCard/landCard';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/initActions';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Dropdown from 'react-dropdown';
import Loader from '../common/assets/images/Loader.svg';
import cards from '../../data/NFTList.json'

class Marketplace extends React.Component {
  componentWillMount = () => {
    // this.props.actions.initCards();
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

Marketplace.propTypes = {};

const mapStateToProps = (state) => {
  const isFetching = state.cards.isFetching;
  return {
    cards: state.cards.cards,
    isFetching,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Marketplace);
