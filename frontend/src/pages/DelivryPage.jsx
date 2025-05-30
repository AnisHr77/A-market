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
        setShowDetails(false);

        try {
            const response = await fetch(`http://localhost:3006/api/orders/tracking/${trackingNumber}`);
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