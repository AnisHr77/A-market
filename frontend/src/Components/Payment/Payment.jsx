import React, { useEffect, useState } from 'react';

const Payment = ({ showPaymentModal, setShowPaymentModal, total }) => {
    const [selectedMethod, setSelectedMethod] = useState('creditcard');
    const [expiry, setExpiry] = useState('');
    const [expiryError, setExpiryError] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cvv, setCvv] = useState('');
    const [paypalEmail, setPaypalEmail] = useState('');
    const [paypalError, setPaypalError] = useState('');
    const [skrillEmail, setSkrillEmail] = useState('');
    const [skrillError, setSkrillError] = useState('');
    const [baridiAmount, setBaridiAmount] = useState('');
    const [baridiCCP, setBaridiCCP] = useState('');
    const [baridiCode, setBaridiCode] = useState('');
    const [imageSrc, setImageSrc] = useState(null);

    const [cardNumberError, setCardNumberError] = useState('');
    const [cardNameError, setCardNameError] = useState('');
    const [cvvError, setCvvError] = useState('');
    const [baridiAmountError, setBaridiAmountError] = useState('');
    const [baridiCCPError, setBaridiCCPError] = useState('');
    const [baridiCodeError, setBaridiCodeError] = useState('');
    const [baridiCaptureError, setBaridiCaptureError] = useState('');

    useEffect(() => {
        resetAllFields();
    }, [selectedMethod, showPaymentModal === false]);

    const resetAllFields = () => {
        setCardNumber('');
        setCardName('');
        setExpiry('');
        setCvv('');
        setCardNumberError('');
        setCardNameError('');
        setExpiryError('');
        setCvvError('');
        setPaypalEmail('');
        setPaypalError('');
        setSkrillEmail('');
        setSkrillError('');
        setBaridiAmount('');
        setBaridiAmountError('');
        setBaridiCCP('');
        setBaridiCCPError('');
        setBaridiCode('');
        setBaridiCodeError('');
        setBaridiCaptureError('');
        setImageSrc(null);
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/[^\d\/]/g, '');

        if (value.length > 0 && value[2] !== '/' && value.includes('/')) {
            value = value.replace(/\//g, '');
        }

        if (value.length === 2 && !value.includes('/')) {
            value += '/';
        }

        if (value.length > 5) {
            value = value.slice(0, 5);
        }

        setExpiry(value);
        setExpiryError('');
    };

    const validate = () => {
        let isValid = true;

        if (selectedMethod === 'creditcard') {
            if (!cardNumber) {
                setCardNumberError('Card Number required');
                isValid = false;
            } else {
                setCardNumberError('');
            }

            if (!cardName) {
                setCardNameError('Cardholder Name required');
                isValid = false;
            } else {
                setCardNameError('');
            }

            if (!expiry) {
                setExpiryError('Expiry date required');
                isValid = false;
            } else {
                setExpiryError('');
            }

            if (!cvv) {
                setCvvError('CVV required');
                isValid = false;
            } else {
                setCvvError('');
            }
        }

        if (selectedMethod === 'paypal') {
            if (!paypalEmail) {
                setPaypalError('Email required');
                isValid = false;
            } else {
                setPaypalError('');
            }
        }

        if (selectedMethod === 'skrill') {
            if (!skrillEmail) {
                setSkrillError('Email required');
                isValid = false;
            } else {
                setSkrillError('');
            }
        }

        if (selectedMethod === 'baridimob') {
            if (!baridiAmount) {
                setBaridiAmountError('Montant requis');
                isValid = false;
            } else {
                setBaridiAmountError('');
            }

            if (!baridiCCP) {
                setBaridiCCPError('Numéro CCP requis');
                isValid = false;
            } else {
                setBaridiCCPError('');
            }

            if (!baridiCode) {
                setBaridiCodeError('Code requis');
                isValid = false;
            } else {
                setBaridiCodeError('');
            }

            if (!imageSrc) {
                setBaridiCaptureError('Capture requise');
                isValid = false;
            } else {
                setBaridiCaptureError('');
            }
        }

        return isValid;
    };

    const handlePlaceOrder = () => {
        if (validate()) {
            alert('Order Placed!');
            return true;
        }
        return false;
    };

    if (!showPaymentModal) return null;

    return (
        <div className="payment-modal-overlay" onClick={() => setShowPaymentModal(false)}>
            <div className="payment-modal-box" onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h2 className="payment-title">Payment Details</h2>
                    <h4 style={{ color: 'black' }}>
                        Total: {selectedMethod === 'baridimob' ? `${(total * 240).toFixed(0)} DZD` : `$${total.toFixed(2)}`}
                    </h4>
                </div>

                <div className="payment-tabs">
                    {['creditcard', 'paypal', 'baridimob', 'skrill'].map((method) => (
                        <button
                            key={method}
                            className={`tab ${selectedMethod === method ? 'active' : ''}`}
                            onClick={() => setSelectedMethod(method)}
                        >
                            {method.charAt(0).toUpperCase() + method.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="payment-form">
                    {selectedMethod === 'creditcard' && (
                        <>
                            <input
                                type="number"
                                inputMode="numeric"
                                placeholder={cardNumberError || 'Card Number'}
                                value={cardNumberError ? '' : cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder={cardNameError || 'Cardholder Name'}
                                value={cardNameError ? '' : cardName}
                                onChange={(e) => setCardName(e.target.value)}
                            />
                            <input
                                type="text"
                                inputMode="numeric"
                                placeholder={expiryError || 'MM/YY'}
                                value={expiryError ? '' : expiry}
                                onChange={handleExpiryChange}
                                maxLength={5}
                            />
                            <input
                                type="text"
                                inputMode="numeric"
                                placeholder={cvvError || 'CVV'}
                                value={cvvError ? '' : cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                maxLength={3}
                            />
                        </>
                    )}

                    {selectedMethod === 'paypal' && (
                        <input
                            type="email"
                            placeholder={paypalError || 'Enter your PayPal Email'}
                            value={paypalError ? '' : paypalEmail}
                            onChange={(e) => setPaypalEmail(e.target.value)}
                        />
                    )}

                    {selectedMethod === 'skrill' && (
                        <input
                            type="email"
                            placeholder={skrillError || 'Skrill Email'}
                            value={skrillError ? '' : skrillEmail}
                            onChange={(e) => setSkrillEmail(e.target.value)}
                        />
                    )}

                    {selectedMethod === 'baridimob' && (
                        <div className="baridimob-form">
                            <label>Destination : 077999990041548483</label>
                            <label>Montant :</label>
                            <input
                                type="number"
                                placeholder="16000"
                                value={baridiAmount}
                                onChange={(e) => setBaridiAmount(e.target.value)}
                            />
                            <label>Your Number CCP</label>
                            <input
                                type="number"
                                placeholder="00799999...."
                                value={baridiCCP}
                                onChange={(e) => setBaridiCCP(e.target.value)}
                            />
                            <label>Transfer Code</label>
                            <input
                                type="number"
                                placeholder="6809..."
                                value={baridiCode}
                                onChange={(e) => setBaridiCode(e.target.value)}
                            />
                            <label>Justificatif de paiement :</label>
                            <input
                                type="file"
                                id="inputFile"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setImageSrc(URL.createObjectURL(file));
                                    }
                                }}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                            <button type="button" onClick={() => document.getElementById('inputFile').click()}>
                                Ajouter une capture
                            </button>

                            {imageSrc && (
                                <div>
                                    <img src={imageSrc} alt="Justificatif" style={{ maxWidth: '200px' }} />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImageSrc(null);
                                            document.getElementById('inputFile').value = null;
                                        }}
                                    >
                                        Supprimer la capture
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="payment-buttons">
                    <button className="cancel-btn" onClick={() => setShowPaymentModal(false)}>
                        Cancel Order
                    </button>
                    <button
                        className="place-btn"
                        onClick={() => {
                            if (handlePlaceOrder()) {
                                setShowPaymentModal(false);
                            }
                        }}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;
