<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React from 'react';
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
import delivery from '../Components/Assets/delivery.jpg';
import './DelivryPage.css';

const DelivryPage = () => {
<<<<<<< HEAD
    const [trackingNumber, setTrackingNumber] = useState('');
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showDetails, setShowDetails] = useState(true);

    const handleInputChange = (e) => {
        setTrackingNumber(e.target.value);
    };

    const handleConfirm = async () => {
        if (!trackingNumber.trim()) {
            alert('Please enter tracking number');
            return;
        }

        setLoading(true);
        setError('');
        setOrderData(null);
        setShowDetails(false);

        try {
            const response = await fetch(`http://localhost:4000/api/orders/tracking/${trackingNumber}`);
            if (!response.ok) {
                throw new Error('Order not found');
            }

            const data = await response.json();
            setOrderData(data);
            setShowDetails(true);
        } catch (err) {
            setError(err.message || 'Failed to fetch order');
        } finally {
            setLoading(false);
        }
    };

    // Create Google Map address URL from shipping address + commune + wilaya
    const mapAddress = orderData
        ? `https://www.google.com/maps?q=${encodeURIComponent(`${orderData.shipping_address}, ${orderData.commune}, ${orderData.wilaya}`)}&output=embed`
        : 'https://www.google.com/maps/embed?pb=!1m18...'; // default map

    return (
        <div className="DelivryPage">
            <div className="delivery-container">
                <p>FOLLOW YOUR TRACKING</p>
            </div>

            <div className="track">
                <img src={delivery} alt="delivery" id="delivery" />
                <iframe
                    src={mapAddress}
                    id="mapg"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map"
                ></iframe>
            </div>

            <div className="inp">
                <label htmlFor="orderIdInput" id="labell">ORDER TRACKING ID</label>
                <input
                    id="orderIdInput"
                    placeholder="Ex: TRK123456"
                    type="text"
                    value={trackingNumber}
                    onChange={handleInputChange}
                />
                <button onClick={handleConfirm} disabled={loading}>
                    {loading ? 'LOADING...' : 'CONFIRM'}
                </button>
            </div>

            {error && (
                <div className="tracker-response error">
                    <p>{error}</p>
                </div>
            )}

            {orderData && showDetails && (
                <div className="tracker-response success">
                    <button className="close-btn" onClick={() => setShowDetails(false)}>×</button>
                    <div className="status-header">
                        <div className="status-icon">
                            {orderData.status === 'processing' ? '⏳' : '✅'}
                        </div>
                        <h3 className="status-title">Order Status: {orderData.status}</h3>
                    </div>
                    <div className="order-details">
                        <div className="detail-item">
                            <div className="detail-label">Order ID</div>
                            <div className="detail-value">{orderData.order_id}</div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-label">Order Date</div>
                            <div className="detail-value">{new Date(orderData.order_date).toLocaleString()}</div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-label">Shipping Address</div>
                            <div className="detail-value">{orderData.shipping_address}</div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-label">Wilaya</div>
                            <div className="detail-value">{orderData.wilaya}</div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-label">Commune</div>
                            <div className="detail-value">{orderData.commune}</div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-label">Estimated Delivery</div>
                            <div className="detail-value">{new Date(orderData.estimated_delivery_date).toLocaleString()}</div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-label">Actual Delivery</div>
                            <div className="detail-value">{new Date(orderData.actual_delivery_date).toLocaleString()}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DelivryPage;
=======
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
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
