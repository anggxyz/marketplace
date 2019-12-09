import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link } from 'react-router-dom';
import './land-card.scss'
// import cardImg from '../assets/images/map3.png'
// import cardImgBig from '../assets/images/map-big.png'
import icons from '../../../services/icon-service.js'
import plazaGreen from '../assets/images/icon-plaza-green.svg'
import districtBlue from '../assets/images/icon-district-blue.svg'
import roadGray from '../assets/images/icon-road-gray.svg'

const MapMarker = icons['fa-map-marker']

class LandCard extends React.Component {
  render () {
    const {
      name,
      months,
      num,
      x,
      y,
      green,
      blue,
      gray,
      mana,
      manaSymbol,
      index,
      my,
      image_url
    } = this.props
    
    return (
      <div key={index} className="col-2">
        <Link key={index} to={my ? '/mycard/'+this.props.id : '/maticcard'} className='land-card h-100'>
          <div className='land-card-preview'>
            <img
              src={image_url}
              alt='cardImg'
              className='land-card-preview-image'
            />
          </div>
          <div className='land-card-content'>
            <div className='land-card-content-text'>
              <div className='land-card-content-heading'>
                <div className='land-card-content-title'>{name}</div>
              </div>
              <div className='land-card-content-date'>{months} MonthsAgo</div>
            </div>
            <div className='land-card-content-info'>
              <div className='land-card-content-xy'>
                {/* <img
                  src={placeIcon}
                  alt="placeIcon"
                  className="land-card-place-icon"
                /> */}
                <MapMarker />
                <p className='land-card-content-x'>{x},</p>
                <p className='land-card-content-x'>{y}</p>
              </div>
              {green && (
                <img src={plazaGreen} className='land-card-content-image green' />
              )}
              {blue && (
                <img
                  src={districtBlue}
                  className='land-card-content-image blue'
                />
              )}
              {gray && (
                <img src={roadGray} className='land-card-content-image gray' />
              )}
            </div>
          </div>
        </Link>
      </div>
      )
  }
}

LandCard.propTypes = {}

export default LandCard
