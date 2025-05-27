import React from 'react';
import './VisaCard.css';
import {FaCcVisa} from "react-icons/fa";
const VisaCard = ({ name, number, expiry }) => {
    return (
        <div className="visaCard">
            <div className="visaLogo">VISA</div>

            <div className="card-number">
                {number ? number : '**** **** **** ****'}
            </div>

            <div className="cardDetails">
                <div>
                    <div className="CardDD">Card Holder</div>
                    <div className="valueCard">{name || 'AbdicheAbdallah'}</div>
                </div>
                <div>
                    <div className="CardDD">Expires</div>
                    <div className="valueCard">{expiry || 'DateExp'}</div>
                </div>
            </div>

            <div className="cardFooter"><FaCcVisa/> Credit Card</div>
        </div>
    );
};

export default VisaCard;
