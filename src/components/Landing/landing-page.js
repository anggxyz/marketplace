import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/initActions';
import './landing-page.scss';
import Icons from '../../services/icon-service';
import LandCard from '../common/landCard/landCard';
import Header from '../Header/Header.js';
import NavBar from '../Navbar/Navbar';
import Loader from '../common/assets/images/Loader.svg';
const FaSearch = Icons['fa-search'];
const FaChevron = Icons['fa-chevron-right'];

class LandingPage extends React.Component {
  componentWillMount = () => {
    this.props.actions.initCards();
  };
  render() {
    const { cards } = this.props;
    return (
      <div className="landing-page">
        <Header />
        <div className="landing-page-publications">
          <div className="landing-page-header">
            <h3 className="landing-page-p">Newest LAND</h3>
            <a href="/marketplace" className="landing-page-a">
              VIEW MORE
              <span>
                <FaChevron />
              </span>
            </a>
          </div>
          <div className="landing-page-scroller">
            {this.props.isFetching ? (
              <img src={Loader} alt="Loading" className="Loader" />
            ) : (
              cards.map((e, i) => <LandCard {...e} index={i} normal />)
            )}
            {/* {!this.state.isLoading &&
              } */}
            {/* {cards.map((e, i) => (
              <LandCard {...e} index={i} normal />
            ))} */}
          </div>
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {};

const mapStateToProps = (state) => {
  const top10 = state.cards.cards.slice(0, 10);
  const isFetching = state.cards.isFetching;
  return {
    cards: top10,
    isFetching,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingPage);
