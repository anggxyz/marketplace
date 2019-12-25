import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Web3 from 'web3';
import * as actions from '../actions/user-actions';
import { Switch, Route } from 'react-router-dom';
// Components import
import LandingPage from './Landing/landing-page';
// import Header from '../components/Header/Header.js';
import signIn from '../components/signIn/signIn.js';
import NavBar from '../components/Navbar/Navbar';
import WhyMatic from '../components/WhyMatic/WhyMatic';
import Marketplace from '../components/Marketplace/Marketplace.js';
import Wallet from '../components/Wallet/Wallet.js';
import Activity from '../components/Activity/Activity.js';
import MyCard from '../components/MyCard/MaticCard';
import MaticNetwork from '../components/MaticNetwork/MaticNetwork.js';
import UserAssets from '../components/UserAssets/UserAssets';
import maticConfig from "../web3/matic-config";
import { store } from '../index';

class Routes extends Component {

  componentDidMount = () => {

    if (!window.web3) {
      window.alert('Please allow Metmask');
      return;
    }

    const network = window.ethereum.networkVersion;
    if (network != maticConfig.MAIN_NETWORK_ID && network != maticConfig.CHILD_NETWORK_ID) {
      alert("Please select supported network");
    } else {
      store.dispatch(actions.matamask_login());
    }

    window.ethereum.autoRefreshOnNetworkChange = false;
    
    window.ethereum.on('networkChanged', (e) => {
      if (e == "loading") {
        return;
      }
      if (e != maticConfig.MAIN_NETWORK_ID && e != maticConfig.CHILD_NETWORK_ID) {
        alert("Please select supported network");
        return;
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
              <Route exact path="/whymatic" component={WhyMatic} />
              <Route exact path="/marketplace/:page" component={Marketplace} />
              <Route exact path="/marketplace" component={Marketplace} />
              <Route exact path="/wallet" component={Wallet} />
              <Route exact path="/activity" component={Activity} />
              <Route exact path="/mycard/:id" component={MyCard} />
              <Route exact path="/maticnetwork" component={MaticNetwork} />
              <Route exact path="/userassets" component={UserAssets} />
            </Switch>
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
