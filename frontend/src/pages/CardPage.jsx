<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CardPage.css';
import { IoIosCloseCircle, IoIosArrowRoundForward } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowRight, MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
=======
import React, { useState } from 'react';
import { useCart } from '../Context/CartContext';
import './CardPage.css';
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";



>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9

const CardPage = () => {
    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
<<<<<<< HEAD
        decreaseQuantity,
        clearCart
    } = useCart();

    const navigate = useNavigate();

    const [expiry, setExpiry] = useState('');
    const [expiryError, setExpiryError] = useState('');

    const handleExpiryChange = (e) => {
        let value = e.target.value;


        value = value.replace(/[^\d\/]/g, '');


        if (value.length > 0 && value[2] !== '/' && value.includes('/')) {
            value = value.replace(/\//g, '');
        }


        if (value.length === 2 && !value.includes('/')) {
            value = value + '/';
        }


        if (value.length > 5) {
            value = value.slice(0, 5);
        }

        setExpiry(value);
        setExpiryError('');
    };

    const validateExpiry = (value) => {

        const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!regex.test(value)) {
            return false;
        }

        const [monthStr, yearStr] = value.split('/');
        const month = parseInt(monthStr, 10);
        const year = parseInt(yearStr, 10);


        const now = new Date();
        const currentYear = now.getFullYear() % 100;
        const currentMonth = now.getMonth() + 1;

        if (month < 1 || month > 12) return false;

        if (year < 25) return false;

        if (year === currentYear && month < currentMonth) return false;

        return true;
    };


    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');

    const [cvv, setCvv] = useState('');
    const [paypalEmail, setPaypalEmail] = useState('');
    const [paypalError, setPaypalError] = useState('');
    const [baridiAmount, setBaridiAmount] = useState('');
    const [baridiCCP, setBaridiCCP] = useState('');
    const [baridiCode, setBaridiCode] = useState('');
    const [baridiError, setBaridiError] = useState('');
    const [skrillEmail, setSkrillEmail] = useState('');
    const [skrillError, setSkrillError] = useState('');
    const [cardNumberError, setCardNumberError] = useState('');
    const [cardNameError, setCardNameError] = useState('');

    const [cvvError, setCvvError] = useState('');
    const [baridiAmountError, setBaridiAmountError] = useState('');
    const [baridiCCPError, setBaridiCCPError] = useState('');
    const [baridiCodeError, setBaridiCodeError] = useState('');
    const [baridiCaptureError, setBaridiCaptureError] = useState('');
    const [deliveryCost, setDeliveryCost] = useState(5.00);
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    let [sidebarOpen, setSidebarOpen] = useState(true);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState("creditcard");
    const [orderStatus, setOrderStatus] = useState(null);
    const [countdown, setCountdown] = useState(7);
    const [showTrackingModal, setShowTrackingModal] = useState(false);

    const resetAllFields = () => {
        setCardNumber("");
        setCardName("");
        setExpiry("");
        setCvv("");
        setCardNumberError("");
        setCardNameError("");
        setExpiryError("");
        setCvvError("");
        setPaypalEmail("");
        setPaypalError("");
        setSkrillEmail("");
        setSkrillError("");
        setBaridiAmount("");
        setBaridiAmountError("");
        setBaridiCCP("");
        setBaridiCCPError("");
        setBaridiCode("");
        setBaridiCodeError("");
        setBaridiCaptureError("");
        setImageSrc(null);
    };

    useEffect(() => {

        resetAllFields();
    }, [selectedMethod, showPaymentModal === false]);
    useEffect(() => {
        if (cartItems.length === 0) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [cartItems]);



    const validate = () => {
        let isValid = true;

        if (selectedMethod === "creditcard") {
            if (!cardNumber) {
                setCardNumberError("Card Number required");
                isValid = false;
            } else {
                setCardNumberError('');
            }

            if (!cardName) {
                setCardNameError("Cardholder Name required");
                isValid = false;
            } else {
                setCardNameError('');
            }

            if (!expiry) {
                setExpiryError("Expiry date required");
                isValid = false;
            } else {
                setExpiryError('');
            }

            if (!cvv) {
                setCvvError("CVV required");
                isValid = false;
            } else {
                setCvvError('');
            }
        }

        if (selectedMethod === "paypal") {
            if (!paypalEmail) {
                setPaypalError("Email required");
                isValid = false;
            } else {
                setPaypalError('');
            }
        }

        if (selectedMethod === "skrill") {
            if (!skrillEmail) {
                setSkrillError("Email required");
                isValid = false;
            } else {
                setSkrillError('');
            }
        }

        if (selectedMethod === "baridimob") {
            if (!baridiAmount) {
                setBaridiAmountError("Montant requis");
                isValid = false;
            } else {
                setBaridiAmountError('');
            }

            if (!baridiCCP) {
                setBaridiCCPError("Numéro CCP requis");
                isValid = false;
            } else {
                setBaridiCCPError('');
            }

            if (!baridiCode) {
                setBaridiCodeError("Code requis");
                isValid = false;
            } else {
                setBaridiCodeError('');
            }

            if (!imageSrc) {
                setBaridiCaptureError("Capture requise");
                isValid = false;
            } else {
                setBaridiCaptureError('');
            }
        }

        return isValid;
    };






    const handlePlaceOrder = () => {
        if (validate()) {
            setOrderStatus('processing');
            setCountdown(7);
            
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setOrderStatus('success');
                        setTimeout(() => {
                            clearCart();
                            setShowPaymentModal(false);
                            setShowTrackingModal(true);
                        }, 2000);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return true;
        }
        return false;
    };


    const cartCount = cartItems.length;
    const cartCounter = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + parseFloat(deliveryCost) - discount;

    const handleDeliveryChange = (event) => {
        const selectedCost = parseFloat(event.target.value);
        setDeliveryCost(selectedCost);
    };
    const deliveryOptions = [
        { label: "Second Delivery", cost: 5.00 },
        { label: "Express Delivery", cost: 10.00 },
        { label: "Free Delivery", cost: 0.00 }
    ];
=======
        decreaseQuantity
    } = useCart();

    const [deliveryCost, setDeliveryCost] = useState(5.00);

    const [promoCode, setPromoCode] = useState('');

    const [discount, setDiscount] = useState(0);

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const cartCount = cartItems.length;
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const total = subtotal + parseFloat(deliveryCost) - discount;

    const handleDeliveryChange = (event) => {
        setDeliveryCost(event.target.value);
    };
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9

    const handleApplyPromo = () => {
        if (promoCode === 'ANISHR77') {
            setDiscount(10);
        } else {
            setDiscount(0);
<<<<<<< HEAD
        }
    };

=======
        }}
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9



    return (
        <div className="CardPage">
<<<<<<< HEAD
            {cartItems.length > 0 && (
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="sidebar-toggle">
                    {sidebarOpen ? <MdOutlineKeyboardDoubleArrowLeft /> : <MdOutlineKeyboardDoubleArrowRight />}
                </button>
            )}

            <div className="CardPage1" style={{ textAlign: 'center', paddingTop: '5rem' }}>
                {cartItems.length === 0 ? (
                    <div
                        id={'empty-state-container'} className={`empty-state-container fade-up delay-1 ${
                        sidebarOpen ? "empty-state-with-sidebar" : "empty-state-full"
                    }`}
                    >
                        <FiShoppingCart className="empty-icon fade-up delay-1" />

                        <h2 className="empty-title fade-up delay-2">Your Cart is Empty</h2>
                        <p className="empty-subtext fade-up delay-3">
                            Looks like you haven't added any items to your cart yet.<br />
                            Browse products and add them to your cart to see them here.
                        </p>
                        <a href="/" className="go-home-link fade-up delay-4">
                            ← Back to Home
                        </a>
                    </div>
=======
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="sidebar-toggle">
                {sidebarOpen ? <MdOutlineKeyboardDoubleArrowLeft /> : <MdOutlineKeyboardDoubleArrowRight />}
            </button>

            <div className="CardPage1">


                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
                ) : (
                    <div className={`CartProduct ${sidebarOpen ? 'with-sidebar' : 'no-sidebar'}`}>
                        <div id="mytitle">
                            <div id="shopicart">Shopping Cart</div>
                            <div id="nitem">{cartCount} Items</div>
                        </div>
<<<<<<< HEAD

=======
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
                        <div className="conttit">
                            <h3 id="Productcr">Product</h3>
                            <div id="productcrr">
                                <h3>Quantity</h3>
                                <h3>Total</h3>
                            </div>
                        </div>

                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-item-row">
                                <div style={{
                                    display: 'flex',
                                    gap: '0.5rem',
                                    alignItems: 'center',
                                    width: '37%',
                                    color: 'white'
                                }}>
<<<<<<< HEAD
                                    <img src={item.image_url} alt={item.name} />
                                    <div style={{ flexDirection: 'column' }}>
                                        <h4 style={{ color: 'white' }}>{item.name}</h4>
                                        <p>{item.description}</p>
                                        <p style={{ color: 'grey' }}>{item.price}$</p>
=======
                                    <img src={item.image} alt={item.title}/>
                                    <div style={{flexDirection: 'column'}}>
                                        <h4 style={{color: 'white'}}>{item.title}</h4>
                                        <p>{item.description}</p>
                                        <p style={{color: 'grey'}}>{item.price}$</p>
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
                                    </div>
                                </div>

                                <div className="quantity-container">
<<<<<<< HEAD
                                    <button className="quantity-btn" onClick={() => decreaseQuantity(item.id)}>-</button>
                                    <span className="quantity-value">{item.quantity}</span>
                                    <button className="quantity-btn" onClick={() => increaseQuantity(item.id)}>+</button>
=======
                                    <button className="quantity-btn" onClick={() => decreaseQuantity(item.id)}>-
                                    </button>
                                    <span className="quantity-value">{item.quantity}</span>
                                    <button className="quantity-btn" onClick={() => increaseQuantity(item.id)}>+
                                    </button>
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
                                </div>

                                <p id="cartprices"><strong>${(item.price * item.quantity).toFixed(2)}</strong></p>

<<<<<<< HEAD
                                <IoIosCloseCircle id="clsbtn" onClick={() => removeFromCart(item.id)} />
                            </div>
                        ))}

                        <a className="cta">
                            <span className="hover-underline-animation"> Add Coupon Code</span>
                            <IoIosArrowRoundForward id="arrow" />
                        </a>
                    </div>
                )}
            </div>

            {sidebarOpen && cartItems.length > 0 && (
=======
                                <IoIosCloseCircle id="clsbtn" onClick={() => removeFromCart(item.id)}/>

                            </div>

                        ))}
                        <a  className="cta">
                            <span className="hover-underline-animation"> Add Cuppon Code</span>
                            <IoIosArrowRoundForward id={'arrow'}/>
                        </a>

                    </div>

                )}
            </div>


            {sidebarOpen && (
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
                <div className="SidebarRight">
                    <div>
                        <h3>Order Summary</h3>

                        <div className="sidebar-summary-section">
<<<<<<< HEAD
                            <span>{cartCounter} Items</span>
=======
                            <span>{cartCount} Items</span>
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <hr />

                        <label className="sidebar-select-label">Shipping</label>
                        <select id="delivcart" onChange={handleDeliveryChange} value={deliveryCost}>
<<<<<<< HEAD
                            {deliveryOptions.map((option, index) => (
                                <option key={index} value={option.cost}>
                                    {option.label} - ${option.cost.toFixed(2)}
                                </option>
                            ))}
                        </select>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault(); // Prevent page reload
                                handleApplyPromo(); // Trigger your apply logic
                            }}
                        >
                            <label className="sidebar-select-label">Promo Code</label>
                            <input
                                id="promo-code"
                                type="text"
                                placeholder="XXXX-XXXX"
                                maxLength={8}
                                value={promoCode}
                                onChange={(e) => {
                                    let input = e.target.value
                                        .toUpperCase()
                                        .replace(/[^A-Z0-9]/g, "")
                                        .slice(0, 8);
                                    setPromoCode(input);
                                }}
                            />

                            <button type="submit" className="apply-btn">
                                Apply
                            </button>
                        </form>

                        {discount > 0 && (
                            <p style={{ color: 'green', fontSize: '0.9rem' }}>
                                Discount applied: -${discount.toFixed(2)}
                            </p>
                        )}

                        <div className="sidebar-total">
                            <span>{cartCounter} Items</span>
=======
                            <option value="5.00">Second Delivery - $5.00</option>
                            <option value="10.00">Express Delivery - $10.00</option>
                            <option value="0.00">Free Delivery - $0.00</option>
                        </select>

                        <label className="sidebar-select-label">Promo Code</label>
                        <input
                            id={'promo-code'}
                            type="text"
                            placeholder="XXXX-XXXX"
                            maxLength={8}
                            value={promoCode}
                            onChange={(e) => {
                                let input = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
                                input = input.slice(0, 8);
                                if (input.length > 4) {
                                    input = `${input.slice(0, 4)}${input.slice(4)}`;
                                }
                                setPromoCode(input);
                            }}
                        />

                        <button className="apply-btn" onClick={handleApplyPromo}>Apply</button>
                        {discount > 0 && <p style={{ color: 'green', fontSize: '0.9rem' }}>Discount applied: -${discount.toFixed(2)}</p>}

                        <div className="sidebar-total">
                            <span>{cartCount} Items</span>
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>

<<<<<<< HEAD
                    <button className="checkout-btn" onClick={() => setShowPaymentModal(true)}>Checkout</button>
                </div>
            )}


            {showPaymentModal && (
                <div className="payment-modal-overlay" onClick={() => setShowPaymentModal(false)}>
                    <div className="payment-modal-box" onClick={e => e.stopPropagation()}>
                        {orderStatus ? (
                            <div className={`order-status-card ${orderStatus}`}>
                                <div className="status-icon">
                                    {orderStatus === 'processing' ? '⏳' : '✅'}
                                </div>
                                <h2 className="status-title">
                                    {orderStatus === 'processing' 
                                        ? `Processing your order (${countdown} seconds)` 
                                        : 'Your order has been processed successfully'}
                                </h2>
                                {orderStatus === 'processing' && (
                                    <>
                                        <div className="loading-spinner"></div>
                                        <div className="countdown-bar">
                                            <div 
                                                className="countdown-progress" 
                                                style={{ width: `${(countdown / 7) * 100}%` }}
                                            ></div>
                                        </div>
                                    </>
                                )}
                                {orderStatus === 'success' && (
                                    <div className="order-status-card success animate-fade-in">
                                        <div className="status-icon animate-bounce">
                                            ✅
                                        </div>
                                        <h2 className="status-title animate-slide-up">
                                            Your order has been processed successfully
                                        </h2>
                                        <p className="animate-slide-up delay-1" style={{ 
                                            color: '#6B7280', 
                                            fontSize: '1rem',
                                            marginTop: '1rem'
                                        }}>
                                            Thank you for your trust
                                        </p>
                                        <p className="animate-slide-up delay-2" style={{ 
                                            color: '#4F46E5', 
                                            fontSize: '0.9rem',
                                            marginTop: '0.5rem'
                                        }}>
                                            Your order has been placed successfully
                                        </p>
                                        <p className="animate-slide-up delay-3" style={{ 
                                            color: '#059669', 
                                            fontSize: '1.1rem',
                                            marginTop: '1rem',
                                            fontWeight: 'bold'
                                        }}>
                                            Your tracking number is: TRK20250522
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h2 className="payment-title">Payment Details</h2>
                                    <h4 style={{ color: 'black' }}>
                                        Total : {selectedMethod === "baridimob" ? `${(total * 240).toFixed(0)} DZD` : `$${total.toFixed(2)}`}
                                    </h4>
                                </div>

                                <div className="payment-tabs">
                                    {["creditcard", "paypal", "baridimob", "skrill"].map((method) => (
                                        <button
                                            key={method}
                                            className={`tab ${selectedMethod === method ? "active" : ""}`}
                                            onClick={() => setSelectedMethod(method)}
                                        >
                                            {method.charAt(0).toUpperCase() + method.slice(1)}
                                        </button>
                                    ))}
                                </div>

                                {selectedMethod === "creditcard" && (
                                    <div className="card-list">
                                        <div
                                            onClick={() => setSelectedMethod("creditcard")}
                                            className={`card ${selectedMethod === "creditcard" ? "selected" : ""}`}
                                        >

                                        </div>

                                        <div
                                            onClick={() => setSelectedMethod("paypal")}
                                            className={`card ${selectedMethod === "paypal" ? "selected" : ""}`}
                                        >

                                        </div>

                                        <div
                                            onClick={() => setSelectedMethod("baridimob")}
                                            className={`card add-card ${selectedMethod === "baridimob" ? "selected" : ""}`}
                                        >

                                        </div>

                                    </div>
                                )}

                                <div className="payment-form">
                                    {selectedMethod === "creditcard" && (
                                        <>


                                            <input
                                                type="number"
                                                inputMode="numeric"
                                                style={{ position:'relative' ,height: '30%',top:'6%',right:'2%',width:'95%' }}
                                                placeholder={cardNumberError || "Card Number"}
                                                value={cardNumberError ? "" : cardNumber}
                                                onChange={(e) => {
                                                    setCardNumber(e.target.value);
                                                    setCardNumberError('');

                                                }}
                                            />




                                            <input
                                                type="text"

                                                placeholder={cardNameError || "Cardholder Name"}
                                                value={cardNameError ? "" : cardName}
                                                onChange={(e) => {
                                                    setCardName(e.target.value);
                                                    setCardNameError('');

                                                }}
                                            />


                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                placeholder={expiryError || "MM/YY"}
                                                value={expiryError ? '' : expiry}
                                                onChange={handleExpiryChange}
                                                maxLength={5}
                                            />




                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                placeholder={cvvError || "CVV"}
                                                value={cvvError ? "" : cvv}
                                                onChange={(e) => {
                                                    setCvv(e.target.value);
                                                    setCvvError('');
                                                }}
                                                maxLength={3}

                                            />


                                        </>
                                    )}

                                    {selectedMethod === "paypal" && (
                                        <input
                                            type="email"
                                            placeholder={paypalError || "Enter your PayPal Email"}
                                            value={paypalError ? "" : paypalEmail}
                                            onChange={(e) => {
                                                setPaypalEmail(e.target.value);
                                                setPaypalError('');
                                            }}
                                            style={{ color: paypalError ? 'red' : undefined }}
                                        />

                                    )}

                                    {selectedMethod === "baridimob" && (
                                        <div className="baridimob-form">
                                            <label style={{ color: 'black', position: 'relative', left: '5px', fontWeight: 'bold' }}>
                                                Destination : 077999990041548483
                                            </label>

                                            <label className="baridimob-label">Montant :</label>
                                            <input
                                                className="baridimob-input"
                                                type="number"
                                                placeholder={baridiAmountError || "Enter Your Amount"}
                                                value={baridiAmount}
                                                onChange={(e) => {
                                                    setBaridiAmount(e.target.value);
                                                    setBaridiAmountError('');
                                                }}
                                            />

                                            <label className="baridimob-label">Your Number CCP</label>
                                            <input
                                                className="baridimob-input"
                                                type="number"
                                                placeholdesr={baridiCCPError || "Enter your CCP number"}
                                                value={baridiCCP}
                                                onChange={(e) => {
                                                    setBaridiCCP(e.target.value);
                                                    setBaridiCCPError('');
                                                }}
                                                maxLength={20}
                                                required
                                            />

                                            <label className="baridimob-label">Transfer Code</label>
                                            <input
                                                className="baridimob-input code-authenticator"
                                                type="number"
                                                placeholder={baridiCodeError || "Enter transfer code"}
                                                value={baridiCode}
                                                onChange={(e) => {
                                                    setBaridiCode(e.target.value);
                                                    setBaridiCodeError('');
                                                }}
                                                maxLength={6}
                                                required
                                            />

                                            <label
                                                htmlFor="inputFile"
                                                id="label-Edit-Line4"
                                                style={{ color: 'black', fontWeight: 'bold', position: 'relative', left: '5px' }}
                                            >
                                                Justificatif de paiement :
                                            </label>
                                            <input
                                                type="file"
                                                id="inputFile"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        setImageSrc(URL.createObjectURL(file));
                                                        setBaridiCaptureError('');
                                                    }
                                                }}
                                                accept="image/*"
                                                style={{ display: "none" }}
                                            />
                                            {baridiCaptureError && <span className="error-text">{baridiCaptureError}</span>}

                                            <button
                                                style={{ position: 'relative', left: '5px' }}
                                                type="button"
                                                onClick={() => document.getElementById("inputFile").click()}
                                                className="upload-btn"
                                            >
                                                Ajouter une capture
                                            </button>

                                            {imageSrc && (
                                                <div style={{ marginTop: "10px" }}>
                                                    <img
                                                        src={imageSrc}
                                                        alt="Justificatif"
                                                        style={{
                                                            maxWidth: "200px",
                                                            borderRadius: "10px",
                                                            display: "block",
                                                            marginBottom: "10px",
                                                        }}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setImageSrc(null);
                                                            document.getElementById("inputFile").value = null;
                                                        }}
                                                        className="remove-btn"
                                                        style={{
                                                            backgroundColor: "red",
                                                            border: "none",
                                                            color: "white",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        Supprimer la capture
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                    )}

                                    {selectedMethod === "skrill" && (
                                        <>
                                            <input
                                                type="email"
                                                placeholder={skrillError || "Skrill Email"}
                                                value={skrillError ? "" : skrillEmail}
                                                onChange={(e) => {
                                                    setSkrillEmail(e.target.value);
                                                    setSkrillError('');
                                                }}
                                                style={{ color: skrillError ? 'red' : undefined }}
                                            />


                                        </>
                                    )}
                                </div>

                                <div className="payment-buttons">
                                    <button
                                        className="cancel-btn"
                                        onClick={() => setShowPaymentModal(false)}
                                    >
                                        Cancel Order
                                    </button>
                                    <button
                                        className="place-btn"
                                        onClick={handlePlaceOrder}
                                    >
                                        Place Order
                                    </button>



                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {showTrackingModal && (
                <div className="payment-modal-overlay animate-fade-in" onClick={() => setShowTrackingModal(false)}>
                    <div className="payment-modal-box tracking-modal animate-scale-in" onClick={e => e.stopPropagation()}>
                        <div className="tracking-content">
                            <h2 className="animate-slide-down" style={{ color: '#059669', marginBottom: '1rem' }}>Order Confirmed!</h2>
                            <div className="animate-slide-up delay-1" style={{ 
                                backgroundColor: '#f0fdf4', 
                                padding: '1.5rem',
                                borderRadius: '8px',
                                border: '2px solid #059669',
                                textAlign: 'center'
                            }}>
                                <p style={{ 
                                    color: '#065f46',
                                    fontSize: '1.2rem',
                                    marginBottom: '0.5rem'
                                }}>
                                    Your tracking number is:
                                </p>
                                <p className="animate-pulse" style={{ 
                                    color: '#059669',
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    letterSpacing: '2px'
                                }}>
                                    TRK20250522
                                </p>
                            </div>
                            <p className="animate-fade-in delay-2" style={{ 
                                color: '#6B7280',
                                fontSize: '0.9rem',
                                marginTop: '1rem',
                                textAlign: 'center'
                            }}>
                                Click anywhere outside to close
                            </p>
                        </div>
                    </div>
                </div>
            )}


=======
                    <button className="checkout-btn">Checkout</button>
                </div>



            )}
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
        </div>
    );
};

export default CardPage;
<<<<<<< HEAD

<style>
{`
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideUp {
        from { 
            opacity: 0;
            transform: translateY(20px);
        }
        to { 
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideDown {
        from { 
            opacity: 0;
            transform: translateY(-20px);
        }
        to { 
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes scaleIn {
        from { 
            opacity: 0;
            transform: scale(0.9);
        }
        to { 
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    .animate-fade-in {
        animation: fadeIn 0.5s ease-out forwards;
    }

    .animate-slide-up {
        animation: slideUp 0.5s ease-out forwards;
    }

    .animate-slide-down {
        animation: slideDown 0.5s ease-out forwards;
    }

    .animate-scale-in {
        animation: scaleIn 0.3s ease-out forwards;
    }

    .animate-bounce {
        animation: bounce 1s ease-in-out infinite;
    }

    .animate-pulse {
        animation: pulse 2s ease-in-out infinite;
    }

    .delay-1 {
        animation-delay: 0.2s;
    }

    .delay-2 {
        animation-delay: 0.4s;
    }

    .delay-3 {
        animation-delay: 0.6s;
    }
`}
</style>
=======
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
