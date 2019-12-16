import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import './landing-page.scss';
import Icons from '../../services/icon-service';
import NFTCard from '../common/NFTCard/NFTCard';
import Header from '../Header/Header.js';
import NavBar from '../Navbar/Navbar';
import Loader from '../common/assets/images/Loader.svg';
const FaSearch = Icons['fa-search'];
const FaChevron = Icons['fa-chevron-right'];

class LandingPage extends React.Component {
  componentWillMount = () => {
    
  };
  render() {
    const { cards } = this.props;
    return (
      <div className="landing-page">
        <Header />
        <div className="landing-page-publications">
          <div className="landing-page-header">
            <h3 className="landing-page-p">Newest LAND</h3>
            <Link to="/marketplace" className="landing-page-a">
              VIEW MORE
              <span>
                <FaChevron />
              </span>
            </Link>
          </div>
          <div className="landing-page-scroller">
            {this.props.isFetching ? (
              <img src={Loader} alt="Loading" className="Loader" />
            ) : (
              cards.map((e, i) => <NFTCard {...e} index={i} normal />)
            )}
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

export default connect(
  mapStateToProps,
)(LandingPage);
