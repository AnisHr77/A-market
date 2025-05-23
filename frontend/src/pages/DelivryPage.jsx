import React from 'react';
import delivery from '../Components/Assets/delivery.jpg';
import './DelivryPage.css';

const DelivryPage = () => {
    return (
        <div className="DelivryPage">
            <div className="delivery-container">
                <p>Select your Tracker</p>
            </div>

            <div className="track">
                <img src={delivery} alt="delivery" id="delivery"/>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9990126144976!2d2.294481315674817!3d48.8588440792871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fdeb74f68ef%3A0x1cbd50d4e2130a6!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1647001234567"

                    id={'mapg'}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>

            </div>

            <div className="inp">
                <label htmlFor="positionInput" id="labell">Enter your Position</label>
                <input id="positionInput" placeholder="Enter your City" type="text"/>
                <button>Confirmer</button>
            </div>

        </div>

    );
};

export default DelivryPage;
