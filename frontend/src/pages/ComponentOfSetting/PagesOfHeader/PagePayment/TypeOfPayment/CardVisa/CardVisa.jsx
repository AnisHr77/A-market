import React, { useState, useEffect } from 'react';
import VisaCard from './VisaCard.jsx';
import './CardVisa.css';

function CardVisa() {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [expiry, setExpiry] = useState('');

    // Charger les données depuis localStorage au démarrage
    useEffect(() => {
        const stored = localStorage.getItem('cardInfo');
        if (stored) {
            const cardData = JSON.parse(stored);
            setName(cardData.name || '');
            setNumber(cardData.number || '');
            setExpiry(cardData.expiry || '');
        }
    }, []);

    return (
        <div className="exchangeContainer2CA">
        <div className="exchangeContainer2">
            <VisaCard name={name} number={number} expiry={expiry} />

            <div className="space">

                <input
                    type="text"
                    placeholder="Card Number"
                    value={number}
                    onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '');
                        value = value.slice(0, 16);
                        value = value.replace(/(.{4})/g, '$1 ').trim();
                        setNumber(value);
                    }}
                    className="space1"
                />

                <input
                    type="text"
                    placeholder="Card Holder"
                    value={name}
                    onChange={(e) => {
                        const value = e.target.value
                            .replace(/[^a-zA-Z\s]/g, '')
                            .slice(0, 20)
                            .toUpperCase();
                        setName(value);
                    }}
                    className="space1"
                />

                <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '').slice(0, 4);
                        if (value.length >= 3) {
                            value = `${value.slice(0, 2)}/${value.slice(2)}`;
                        }
                        setExpiry(value);
                    }}
                    className="space1"
                />

                <button
                    id="BtnApplyCardVisa"
                    onClick={() => {
                        const cardData = { name, number, expiry };
                        localStorage.setItem('cardInfo', JSON.stringify(cardData));

                    }}
                >
                    Apply
                </button>
            </div>
        </div>
        </div>
    );
}

export default CardVisa;
