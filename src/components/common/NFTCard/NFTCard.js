import React, { Component } from 'react'
import {Link } from 'react-router-dom';
import './nft-card.scss'
import MANA from '../assets/images/MANA.png';
import WETH from '../assets/images/WETH.png';
import ETH from '../assets/images/ETH.png';

class NFTCard extends React.Component {
  render () {
    const token = this.props.order_metadata.lowest_sell_order.payment_token.symbol;
    const price = this.props.order_metadata.lowest_sell_order.payment_token_price;
    return (
      <div key={this.props.index} className="col-3 my-3">
        <Link key={this.props.index} to={`/mycard/${this.props.token_id}`} className='land-card h-100'>
          <div className='land-card-preview'>
            <img
              src={this.props.image_url}
              alt='cardImg'
              className='land-card-preview-image'
            />
          </div>
          <div className='land-card-content'>
            <div className="row">
              <div className="col">
                <div className="collection-name">{this.props.collections[0].name}</div>
              </div>
              <div className="col ml-auto text-right">
                <div className="d-inline-flex" title={`${price} ${token}`}>
                  <div className="mr-2">
                    <img className="token-symbol" src={token === "MANA" ? MANA : token === "WETH" ? WETH : ETH} />
                  </div>
                  <div className="">{price}</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className='land-card-content-title'>{this.props.name}</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
      )
  }
}

NFTCard.propTypes = {}

export default NFTCard
