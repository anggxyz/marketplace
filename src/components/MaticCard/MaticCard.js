import React from 'react';
import "./MaticCard.scss";
import img from "../common/assets/images/img.png"
import Icons from '../../services/icon-service';
const Map = Icons['fa-map-marker'];
import wallet from '../common/assets/images/square.png'
import balance from '../common/assets/images/balance-icon.svg'
import location from "../common/assets/images/location.svg"
import chat from "../common/assets/images/chat.svg"

class MaticCard extends React.Component {

    render() { 
        return ( <div className="card">
                    <div className="card-img-block">
                        <div className="card-img">
                            <img src={img}></img>
                        </div>
                    </div>
                <div className="card-details"> 
                    <div className="card-details-line1">
                        
                       <div className="line-1-div">
                           <div >
                           <div><p className="para1">Private road Connection</p></div>
                            <div className="para-img"><span className="map"><Map size="30px"/></span><p>-73, -112</p></div>
                           </div>
                           
                            
                            <div className="own-by">
                                <div>
                                    <span><p>Owned by</p></span>
                                    <img src={wallet}></img>
                                </div>
                                 
                            </div>
                        </div>
                        <div className="para-grey">
                          <p className="para-grey">Most Valuable parcel for this price on market </p>
                        </div>
                    </div>
                    
                </div>
                <div className="card-details-line2">
                    <div className="line2">
                        <div className="line2-price">
                            <div><p>Price</p></div>
                            <div className="val"><img src={balance}></img><span>1000</span></div>
                        </div>
                        <div className="line2-time">
                            <p className="para-white">Time Left</p>
                            <p className="para-grey">Expire in 29 Days</p>
                        </div>
                        <div className='line-2-btn'>
                            <div className="btn-bid"><a  href="#">BID</a></div>
                            <div className="btn-buy"><a  href="#">BUY</a></div>
                        </div>
                    </div>
                   
                </div>
                <div className="card-details-line3">
                    <div className="trans-p"><p>Trasnsaction History</p></div>
                    <div className="tran-parrent">
                    <div className="tran-container">
                        <div className="price">
                            <span>PRICE</span>
                            <p>⏣ 2,000</p>
                        </div>
                        <div className="when">
                            <span>WHEN</span>
                            <p>over one year</p>
                        </div>
                        <div className="from" >
                            <span>FROM</span>
                            <p>Auction</p>
                        </div>
                        <div className="to">
                            <span>TO</span>
                            <div><img src={wallet}></img><p>0xa0e7d....969c4a2</p></div>
                        </div>
                    </div>
                    </div>
                </div>
        </div> );
    }
}
 
export default MaticCard;