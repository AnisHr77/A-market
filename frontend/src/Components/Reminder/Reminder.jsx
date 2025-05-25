import React from 'react'
import './Reminder.css'
import { LiaIdCardSolid } from "react-icons/lia";
import { FaRegCreditCard } from "react-icons/fa6";
import { PiCarBold } from "react-icons/pi";

const Reminder = () => {
    return (
        <div className='Reminder'>
            <div className="Choosing">
                <div className="Choosingcont">
                    <div className="Why">
                        <svg style={{position:'relative',top:'1px'}} width="20" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.25 6.75L8.25 9.75L6.75 8.25M15 7.62379C15 12.55 11.274 14.7585 9.69434 15.4735L9.69235 15.4744C9.52621 15.5496 9.44294 15.5873 9.25415 15.6197C9.1346 15.6402 8.86616 15.6402 8.7466 15.6197C8.55707 15.5872 8.47292 15.5493 8.30546 15.4735C6.72585 14.7586 3 12.55 3 7.62378V4.65015C3 3.81007 3 3.38972 3.16349 3.06885C3.3073 2.7866 3.5366 2.5573 3.81885 2.41349C4.13972 2.25 4.56007 2.25 5.40015 2.25H12.6001C13.4402 2.25 13.8597 2.25 14.1805 2.41349C14.4628 2.5573 14.6929 2.7866 14.8367 3.06885C15 3.3894 15 3.80925 15 4.64768V7.62379Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span style={{position :'relative', top:'-2px'}}> Why Choose A+</span>
                    </div>
                    <div className="Security">
                        <div >
                            <LiaIdCardSolid style={{position:'relative',left:'-2px',height:'21px',width:'25px'}}/>
                            <span style={{position :'relative', top:'-6px'}}> Security Privacy</span>
                        </div>
                        <div>
                            <FaRegCreditCard style={{position:'relative', top:'2px',left:'-2px',height:'15px',width:'25px'}}/>
                            <span >Safe Payment</span>
                        </div>
                        <div style={{border:'none'}}>
                            <PiCarBold  style={{position:'relative', top:'2px',left:'-2px',height:'15px',width:'25px'}} />
                            <span >Free Dellivery </span>

                            <span style={{position:'relative', left:'10px'}}> > </span>
                        </div>

                    </div>
                </div>
            </div>
            <div className="More">
                <div className="Friendlycont">
                    <div className='Friendly'>
                        Friendly Reminder: Don’t forget to use AI chat to quickly and easily find your favorite product.
                    </div>
                    <div className="See">
                        <a href="#">See more<span style={{position:'relative', left:'10px'}}> ></span></a>
                    </div>
                </div>
            </div>


        </div>

    )
}
export default Reminder
