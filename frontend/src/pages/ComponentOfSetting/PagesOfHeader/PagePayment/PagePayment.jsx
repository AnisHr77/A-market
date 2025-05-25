import {NavLink,useLocation, Route, Routes,Navigate,Outlet} from "react-router-dom";
import Crypto from "./TypeOfPayment/Crypto.jsx";
import CardVisa from './TypeOfPayment/CardVisa/CardVisa.jsx'
import PayPal from './TypeOfPayment/PayPal.jsx'
import BaridiMob from './TypeOfPayment/BaridiMob.jsx'
import Skrill from './TypeOfPayment/Skrill.jsx'
import SkrillImage from '../../../../Components/Assets/Skrill (1).png';
import '../../HeaderContent/HeaderContent.css';
import React from "react";
import {RiBtcFill} from "react-icons/ri";
import {FaCcVisa} from "react-icons/fa";
import {FaCcPaypal} from "react-icons/fa6";

import './PagePayment.css';
function PagePayment(){
    const location = useLocation();
    const isPaymentPath = location.pathname.includes('/Settings/Payment');

    return(<>
        <div className="head2hR">
            <div className="head2">


                <NavLink
                                           to="Crypto"
                                           id={'Crypto'}
                                           className={({ isActive }) =>
                                               isActive || (isPaymentPath && location.pathname.endsWith('Payment'))
                                                    ? "Selector active"
                                                     : "Selector"
                                             }
                                             end={false}
                                         >
                                             Crypto <RiBtcFill style={{width:"40px",height:"35px",color:"#f88f00"}}/>
                </NavLink>
                <NavLink
                                            to="CardVisa"
                                            id={'CardVisa'}
                                           className={({ isActive }) =>
                                                isActive ? "Selector active" : "Selector"
                                            }
                                        >
                                            CardVisa <FaCcVisa style={{width:"40px",height:"35px",color:"#004c98"}}/>
                                        </NavLink>
                <NavLink
                                             to="PayPal"
                                             id={'PayPal'}
                                            className={({ isActive }) =>
                                                 isActive ? "Selector active" : "Selector"
                                            }
                                        >
                                             PayPal <FaCcPaypal style={{width:"40px",height:"35px",color:"rgb(0, 139, 255)"}}/>
                                       </NavLink>
                <NavLink
                                             to="BaridiMob"
                                             id={'BaridiMob'}
                                             className={({ isActive }) =>
                                                 isActive ? "Selector active" : "Selector"
                                             }
                                         >
                                             BaridiMob<img width={"40px"} height={"35px"} src={"https://www.baridimob.com/wp-content/uploads/Baridiweb-logo.png"} />
                                         </NavLink>
                <NavLink
                                        to="Skrill"
                                        id={'Skrill'}
                                        className={({ isActive }) =>
                                             isActive ? "Selector active" : "Selector"
                                        }
                                     >
                                         Skrill<img src={SkrillImage} width={"35px"} height={"32px"}/>
                                     </NavLink>
            </div>
        </div>

        <hr />



        <Outlet />



    </>);

}export default PagePayment;
