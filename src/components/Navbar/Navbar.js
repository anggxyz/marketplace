import React from 'react';
import logo from '../common/assets/images/nav-logo.svg';
import icons from '../../services/icon-service';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/popup_actions';
import Popup from '../common/popup/Popup.js';
import LoginPopup from '../common/popup/loginPopup.js';
import ConnectWallet from '../common/popup/connectWallet';
import MaticNetworkPopup from '../common/popup/maticNetwork';
//Images
import MaticIcon from '../common/assets/images/blue_dark.svg';
import ProfileIcon from '../common/assets/images/square.png';
import Point from '../common/assets/images/Oval.svg';
//css
import './Navbar.scss';
import { bindActionCreators } from 'redux';

//React Icons Start

const FaBars = icons['fa-bars'];
const FaBell = icons['fa-bell'];
const FaWindowClose = icons['fa-close'];
//Icons End

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topNav: true,
      navSmall: false,
      loading: false
    };
  }

  closePopup = () => {
    this.props.actions.login_popup_c();
  };

  closeCW = () => {
    this.props.actions.connect_wallet_c();
  }

  closeMatNet = () => {
    this.props.actions.matic_net_c();
  }

  openMatNet = () => {
    this.props.actions.matic_net_o();
  }

  navBarClickHandler = () => {
    const newState = { ...this.state, topNav: !this.state.topNav };
    this.setState(newState);
  };

  showPopup = () => {
    this.props.actions.login_popup_o()
  };

  render() {
    const {
      isLanding,
      isWallet,
      isActivity,
      showLoginPopup,
      connectWallet,
      maticNetworkPopup,
      isSignIn,
      network,
      mana
    } = this.props;

    if (isLanding || isWallet) return <div></div>;

    function roundNumber(rnum, rlength) { 
      var newnumber = Math.floor(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
      return newnumber;
    }

    const isMaticNetwork = network != 3 && network >3;
    return (
      <div id="nav-bar">
        <nav
          className={
            this.state.topNav ? 'Navigation' : 'Navigation Responsive'
          }>
          <div className="sidebar">
            <FaWindowClose
              onClick={this.navBarClickHandler}
              className="sidebar-icon"
              style={{ color: '#fff' }}
            />
            <div className="sidebar-menu">
              <div className="sidebar-content">
                <Link to="/marketplace" className="sidebar-item enabled">
                  Marketplace
                </Link>
                <Link to="/userassets" className="sidebar-item enabled">
                  Myassets
                </Link>
                {isActivity && (
                    <Link to="/activity" className="sidebar-item enabled">
                      Activity
                    </Link>
                )}
              </div>
            </div>
          </div>
          <FaBars className="FaBars" onClick={this.navBarClickHandler} />
          <Link to="/" className="Navigation-logo-link">
            <img src={logo} alt="logo" className="Navigation-logo" />
          </Link>
          <div className="Navigation-menu">
            <NavLink to="/marketplace" activeClassName="enabled" className="Navigation-item">
              Marketplace
            </NavLink>
            {
              isSignIn && 
              <NavLink to="/userassets" activeClassName="enabled" className="Navigation-item">
                Myassets
              </NavLink>
            }
            {isActivity && (
              <NavLink to="/activity" activeClassName="enabled" className="Navigation-item">
                Activity
              </NavLink>
            )}
          </div>
          {!isSignIn ? (
            <a onClick={this.showPopup} className="Navigation-item">
              SignIn
            </a>
          ) : (
            <div className="signedIn">
              {!isMaticNetwork ? (
                <div onClick={this.openMatNet} className="signedIn-extra">
                  <img
                    src={MaticIcon}
                    alt="MaticIcon"
                    className="signedIn-icon"
                  />
                  <div className="signedIn-link">
                    SWITCH TO MATIC
                  </div>
                </div>
              ) : (
                <div className="signedIn-extra">
                  <img src={Point} className="signedIn-icon"></img>
                  <p>Matic Network </p>
                </div>
              )}
              <span className="signedIn-bell-parent">
                <FaBell className="signedIn-bell" />
              </span>

              <p className="signedIn-p">⏣ &nbsp; {roundNumber(mana/Math.pow(10, 18), 4)}</p>
              <Link to="/wallet">
                <img
                  src={ProfileIcon}
                  alt="ProfileIcon"
                  className="signedIn-profile"
                  style={{ width: '40px', height: 'auto' }}
                />
              </Link>
            </div>
          )}
        </nav>
        {showLoginPopup && (
          <Popup closePopup={this.closePopup}>
            <LoginPopup />
          </Popup>
        )}
        {connectWallet && (
          <Popup closePopup={this.closeCW}>
            <ConnectWallet/>
          </Popup>
        )}
        {
          maticNetworkPopup && (
            <Popup closePopup={this.closeMatNet}>
              <MaticNetworkPopup close={this.closeMatNet} />
            </Popup>
          )
        }
      </div>
    );
  }
}

NavBar.propTypes = {};

const mapStateToProps = (state) => {
  const market = state.router.location.pathname === '/marketplace';
  const isLanding = state.router.location.pathname === '/';
  const isWallet = state.router.location.pathname === '/wallet';
  const isActivity = state.activity.activity.length>0;
  const showLoginPopup = state.popups.login_popup
  const connectWallet = state.popups.connect_wallet;
  const maticNetworkPopup = state.popups.matic_network;
  const isSignIn = state.user.is_sign_in;
  const network = state.user.network;
  const mana = state.user.mana;

  return {
    market,
    isLanding,
    isWallet,
    isActivity,
    showLoginPopup,
    connectWallet,
    maticNetworkPopup,
    isSignIn,
    network,
    mana
  };
};
const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
