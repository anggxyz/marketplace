import React from 'react'
import blue_dark from '../common/assets/images/balance-icon.svg'
import caution from '../common/assets/images/caution.svg';
import './AddFund.scss'

class AddFund extends React.Component {
  render () {
    return (<div className='main'>
      <div className='addfund'>
        <div className="caution">
          <div className="caution-img">
            <img src={caution}></img>
          </div>
          <div className='caution-content'>
            <p className="unauthorised">Unauthorised </p>
            <p className="para">You Need to got <span>Setting</span> and authorised the Matic Plasma contact to</p>
            <p className="para">operate LAND on your behalf before you can list it on sale</p>
          </div>
        </div>
        <h1 className='addfund-heading'>Add fund to matic</h1>
        <div className='addfund-balance'>
          <p className='addfund-balance-1'>Your current balance is <span><img src={blue_dark} /> <p>1000</p> </span> in Ethereum mainnet</p>
        </div>
        <p className='addfund-amt'>Amount</p>
        <div className='addfund-amtval'>
          <div className='addfund-amtval-div'>
            <img className='amtval-div-img' src={blue_dark} />
            <p className='amt-div-p'><input type="text" Value="500"></input></p>
          </div>
          <div className='addfund-amtval-max'><a href="#">MAX</a></div>
        </div>
        <div className='addfund-hr' />
        <p className='addfund-gas'>Gas Option</p>
        <div className='addfund-btn'>
          <div className='btn-button'>
            <p>Fast <span>.</span> 0.001 ETH</p>
          </div>
          <div className='btn-button'>
            <p>Medium <span>.</span> 0.001 ETH</p>
          </div>
          <div className='btn-button'>
            <p>Slow <span>.</span> 0.001 ETH</p>
          </div>
        </div>
        <div className='addfund-sub'>
          <a href="#" className='sub-cancel'>CANCEL</a>
          <a href="#" className='sub-submit'>SUBMIT</a>
        </div>
      </div>
            </div>)
  }
}

export default AddFund
