import React from 'react';
import "./why-matic.scss"
import icons from '../../services/icon-service';
const StartIcons = icons['md-start-circle']
class WhyMatic extends React.Component {
    state = {  }
    render() { 
        return (<div>
            <div className="why">
                <div className="appendix-1">
                <div className="why-matic">
                    <h1>Why Matic ?</h1>
                    <span><a href="#">LEARN MORE</a></span>
                </div>
                <div className="why-row">

                    <div className="why-row-col-1">
                        <h2>Advantage over Mainnet</h2>
                        <div>
                         <span><StartIcons size={60} className="col-1-icon"/></span>
                         <div>
                           <h2>Faster transactions</h2>
                           <p>Make near-instant transactions on Matic Network</p>
                         </div>
                         
                        </div>

                        <div>
                        <span><StartIcons size={60} className="col-1-icon"/></span>
                           <div>
                              <h2>Fees</h2>
                              <p>Negligible gas fees</p>
                           </div>
                        </div>

                        <div>
                            <span><StartIcons size={60} className="col-1-icon"/></span>
                            <div>
                               <h2>Bulk Deposits</h2>
                               <p>Deposit multiple assests in one-go</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="why-row-col-2">
                        <h2>How it works ?</h2>
                        
                        <div>
                            <div>
                                <div> 1</div>
                                <p>Move to Matic</p>
                            </div>
                            <div class="vl"></div>
                        </div>

                        <div>
                            <div>
                                <div>2</div>
                                <p>Sell and Trade on Matic</p>
                            </div>
                            <div class="vl"></div>
                        </div>

                        <div>
                            <div>
                                <div>3</div>
                                <p>Move Back to Mainnet</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="why-row-2">
                    <button className="why-row-2-btn"> NEXT </button>
                </div>

                </div>
                
            </div>

        </div> );
    }
}
 
export default WhyMatic;