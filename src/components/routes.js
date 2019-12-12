import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Web3 from 'web3';
import * as actions from '../actions/user-actions';
import { Switch, Route } from 'react-router-dom';
// Components import
import LandingPage from './Landing/landing-page';
// import Header from '../components/Header/Header.js';
import Footer from '../components/Footer/Footer.js';
import signIn from '../components/signIn/signIn.js';
import colorKey from '../components/colorKey/colorKey.js';
import NavBar from '../components/Navbar/Navbar';
import WhyMatic from '../components/WhyMatic/WhyMatic';
import Marketplace from '../components/Marketplace/Marketplace.js';
import Wallet from '../components/Wallet/Wallet.js';
import Activity from '../components/Activity/Activity.js';
import MaticCard from '../components/MaticCard/MaticCard.js';
import MyCard from '../components/MyCard/MaticCard';
import AddFund from '../components/AddFund/AddFund.js';
import MaticNetwork from '../components/MaticNetwork/MaticNetwork.js';
import Address from '../components/Address/Address.js';
import NotPartOfDesign from '../components/NotPartOfDesign/NotPartOfDesign.js'
import { store } from '../index';

class Routes extends Component {

  componentDidMount = () => {

    window.onbeforeunload = function() {
      return "Prevent reload"
    }
    
    if (!window.web3) {
      window.alert('Please allow Metmask');
      return;
    }

    const web3 = window.web3 ?
        new Web3(window.web3.currentProvider) :
        new Web3(new Web3("https://ropsten.infura.io/v3/70645f042c3a409599c60f96f6dd9fbc")); //TODO insert custom key

    window.ethereum.autoRefreshOnNetworkChange = false;
    window.ethereum.on('networkChanged', (e) => {
      if (e == "loading") {
        return;
      }
      if (e != 3) {
        alert("Please select ropsten network")
      }
      store.dispatch(actions.matamask_login(e));
    })
    window.ethereum.on('accountsChanged', function (accounts) {
      store.dispatch(actions.matamask_login());
    })
  }

  // componentDidUpdate = () => {

  //   if(!this.props.user.is_sign_in) return;
  // }

  render() {
    return (
      <div style={styles.fill}>
        <div
          style={{
            position: 'relative',
            minHeight: '100vh',
          }}>
          <div style={{ paddingBottom: '80px' }}>
            <NavBar />
            <Switch location={this.props.location}>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/signin" component={signIn} />
              <Route exact path="/colorKey" component={colorKey} />
              <Route exact path="/whymatic" component={WhyMatic} />
              <Route exact path="/marketplace/:page" component={Marketplace} />
              <Route exact path="/marketplace" component={Marketplace} />
              <Route exact path="/wallet" component={Wallet} />
              <Route exact path="/activity" component={Activity} />
              <Route exact path="/addfund" component={AddFund} />
              <Route exact path="/maticcard" component={MaticCard} />
              <Route exact path="/mycard/:id" component={MyCard} />
              <Route exact path="/maticnetwork" component={MaticNetwork} />
              <Route exact path="/myland" component={Address} />
              <Route exact path="/notpartofdesign" component={NotPartOfDesign}/>
            </Switch>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}
const styles = {};
styles.fill = {
  position: 'fixed',
  overflowY: 'auto',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

Routes.propTypes = {
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    location: state.router.location,
    user: state.user
  };
};
export default connect(mapStateToProps)(Routes);
