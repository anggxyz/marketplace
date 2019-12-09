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

class Marketplace extends React.Component {
  componentWillMount = () => {
    // this.props.actions.initCards();
  };

  pagination = () => {
    const { cards, match } = this.props;
    const page =
      match && match.params && match.params.page
        ? Number(match.params.page)
        : 1;
    const max = 12;
    const sz = cards.length;
    const t_pages = sz % max == 0 ? sz / max : Math.ceil(sz / max);
    let pages = [];
    if (t_pages > 8) {
      if (page <= 4) {
        pages.push(1);
        pages.push(2);
        pages.push(3);
        pages.push(4);
        pages.push(5);
        pages.push('...');
        pages.push(t_pages);
      } else if (page > t_pages - 4) {
        pages.push(1);
        pages.push('...');
        pages.push(t_pages - 4);
        pages.push(t_pages - 3);
        pages.push(t_pages - 2);
        pages.push(t_pages - 1);
        pages.push(t_pages);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(page - 1);
        pages.push(page);
        pages.push(page + 1);
        pages.push('...');
        pages.push(t_pages);
      }
    } else {
      for (let i = 0; i <= t_pages; i++) {
        pages = [...pages, i + 1];
      }
    }
    return pages.map((e, i) =>
      e != '...' ? (
        <Link
          to={`/marketplace/${e}`}
          className={e === page ? 'item active' : 'item'}
          key={i}>
          {e}
        </Link>
      ) : (
        <a className={e == page ? 'item active' : 'item'} key={i}>
          {e}
        </a>
      ),
    );
  };

  render() {
    const { cards, match } = this.props;

    const page =
      match && match.params && match.params.page
        ? Number(match.params.page)
        : 1;
    const max = 12;
    const sz = cards.length;

    const currentCards = cards.slice(0, 12);

    // const defaultOption = options['Cheapest'];
    const options = ['Cheapest', 'Newest', 'Closest to Expire'];
    const cardsReversed = currentCards.reverse();
    return (
      <div>
        {/* <NavBar Marketplace="true" /> */}
        <div className="marketplace-container">
          <Tabs>
            <div className="marketplace-container-menu">
              <div className="menu-container">
                <TabList className="menu-container-item">
                  <Tab className="menu-item">
                    Parcels <span className="parcel">{sz}</span>
                  </Tab>
                  <Tab className="menu-item">
                    Estates <span className="dead">{sz}</span>
                  </Tab>
                </TabList>
                {/* <div className="menu-list">
                <input type="text" list="lang" placeholder="English"></input>
                <datalist id="lang">
                  <option value="English"></option>
                  <option value="French"></option>
                  <option value="Japanese"></option>
                  <option value="Spanish"></option>
                </datalist>
              </div> */}
                <Dropdown
                  options={options}
                  onChange={this._onSelect}
                  // value={defaultOption}
                  placeholder="Cheapest"
                />
              </div>
            </div>

            <TabPanel>
              <div className="marketplace-container-cards-collection">
                <div className="marketplace-container-cards">
                  {this.props.isFetching ? (
                    <img src={Loader} alt="Loading" className="Loader" />
                  ) : (
                    currentCards.map((e, i) => (
                      <LandCard {...e} key={i} index={i} normal />
                    ))
                  )}
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="marketplace-container-cards-collection">
                <div className="marketplace-container-cards">
                  {this.props.isFetching ? (
                    <img src={Loader} alt="Loading" className="Loader" />
                  ) : (
                    cardsReversed.map((e, i) => (
                      <LandCard {...e} key={i} index={i} normal />
                    ))
                  )}
                </div>
              </div>
            </TabPanel>
            <div className="marketplace-container-button">
              <div className="marketplace-container-pagination">
                {this.pagination()}
              </div>
            </div>
          </Tabs>
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
