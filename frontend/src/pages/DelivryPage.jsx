import React, { useState } from 'react';
import delivery from '../Components/Assets/delivery.jpg';
import './DelivryPage.css';

const DelivryPage = () => {
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
        setShowDetails(false); // optional: hide it first for quick refresh UX

        try {
            const response = await fetch(`http://localhost:3006/api/orders/tracking/${trackingNumber}`);
            if (!response.ok) {
                throw new Error('Order not found');
            }

            const data = await response.json();
            setOrderData(data);
            setShowDetails(true); // <-- always show details after success
        } catch (err) {
            setError(err.message || 'Failed to fetch order');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="DelivryPage">
            <div className="delivery-container">
                <p>FOLLOW YOUR TRACKING</p>
            </div>

            <div className="track">
                <img src={delivery} alt="delivery" id="delivery" />
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9990126144976!2d2.294481315674817!3d48.8588440792871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fdeb74f68ef%3A0x1cbd50d4e2130a6!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1647001234567"
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
                    <p><strong>Status:</strong> {orderData.status}</p>
                    <p><strong>Order ID:</strong> {orderData.order_id}</p>
                    <p><strong>Order Date:</strong> {new Date(orderData.order_date).toLocaleString()}</p>
                    <p><strong>Shipping Address:</strong> {orderData.shipping_address}</p>
                    <p><strong>Wilaya:</strong> {orderData.wilaya}</p>
                    <p><strong>Commune:</strong> {orderData.commune}</p>
                    <p><strong>Estimated Delivery:</strong> {new Date(orderData.estimated_delivery_date).toLocaleString()}</p>
                    <p><strong>Actual Delivery:</strong> {new Date(orderData.actual_delivery_date).toLocaleString()}</p>
                </div>
            )}

        </div>
    );
};

export default DelivryPage;
