import React, { useState, useEffect } from 'react';
import { useCart } from '../Context/CartContext';
import './CardPage.css';
import { IoIosCloseCircle, IoIosArrowRoundForward } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowRight, MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

const CardPage = () => {
    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity
    } = useCart();

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
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState("creditcard");

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
            alert("Order Placed!");
            return true;
        }

        return false;
    };


    const cartCount = cartItems.length;
    const cartCounter = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + parseFloat(deliveryCost) - discount;

    const handleDeliveryChange = (event) => {
        setDeliveryCost(parseFloat(event.target.value));
    };

    const handleApplyPromo = () => {
        if (promoCode === 'ANISHR77') {
            setDiscount(10);
        } else {
            setDiscount(0);
        }
    };




    return (
        <div className="CardPage">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="sidebar-toggle">
                {sidebarOpen ? <MdOutlineKeyboardDoubleArrowLeft /> : <MdOutlineKeyboardDoubleArrowRight />}
            </button>

            <div className="CardPage1">
                {cartItems.length === 0 ? (
                    <p style={{position:"fixed",top:'35%',left:'30%',translate:'transform(-50,-50%)',fontSize:'2rem',fontFamily:'"Plus Jakarta sans", sans-serif'}}>Your cart is empty.</p>
                ) : (
                    <div className={`CartProduct ${sidebarOpen ? 'with-sidebar' : 'no-sidebar'}`}>
                        <div id="mytitle">
                            <div id="shopicart">Shopping Cart</div>
                            <div id="nitem">{cartCount} Items</div>
                        </div>

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
                                    <img src={item.image} alt={item.title} />
                                    <div style={{ flexDirection: 'column' }}>
                                        <h4 style={{ color: 'white' }}>{item.title}</h4>
                                        <p>{item.description}</p>
                                        <p style={{ color: 'grey' }}>{item.price}$</p>
                                    </div>
                                </div>

                                <div className="quantity-container">
                                    <button className="quantity-btn" onClick={() => decreaseQuantity(item.id)}>-</button>
                                    <span className="quantity-value">{item.quantity}</span>
                                    <button className="quantity-btn" onClick={() => increaseQuantity(item.id)}>+</button>
                                </div>

                                <p id="cartprices"><strong>${(item.price * item.quantity).toFixed(2)}</strong></p>

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

            {sidebarOpen && (
                <div className="SidebarRight">
                    <div>
                        <h3>Order Summary</h3>

                        <div className="sidebar-summary-section">
                            <span>{cartCounter} Items</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <hr />

                        <label className="sidebar-select-label">Shipping</label>
                        <select id="delivcart" onChange={handleDeliveryChange} value={deliveryCost}>
                            <option value="5.00">Second Delivery - $5.00</option>
                            <option value="10.00">Express Delivery - $10.00</option>
                            <option value="0.00">Free Delivery - $0.00</option>
                        </select>

                        <label className="sidebar-select-label">Promo Code</label>
                        <input
                            id="promo-code"
                            type="text"
                            placeholder="XXXX-XXXX"
                            maxLength={8}
                            value={promoCode}
                            onChange={(e) => {
                                let input = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
                                setPromoCode(input);
                            }}
                        />

                        <button className="apply-btn" onClick={handleApplyPromo}>Apply</button>
                        {discount > 0 && <p style={{ color: 'green', fontSize: '0.9rem' }}>Discount applied: -${discount.toFixed(2)}</p>}

                        <div className="sidebar-total">
                            <span>{cartCounter} Items</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <button className="checkout-btn" onClick={() => setShowPaymentModal(true)}>Checkout</button>
                </div>
            )}

            {showPaymentModal && (
                <div
                    className="payment-modal-overlay"
                    onClick={() => setShowPaymentModal(false)}
                >
                    <div className="payment-modal-box" onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h2 className="payment-title">Payment Details</h2>
                            <h4 style={{ color: 'black' }}>
                                Total : {selectedMethod === "baridimob" ? `${(total * 240).toFixed(0)} DZD` : `$${total.toFixed(2)}`}
                            </h4>
                        </div>

                        <div>
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
                                    <div className="card selected">
                                        <p></p>
                                    </div>
                                    <div className="card">
                                        <p></p>
                                    </div>
                                    <div className="card add-card">
                                        <p></p>
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
                                            placeholder={baridiCCPError || "Enter your CCP number"}
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
                </div>
            )}


        </div>
    );
};

export default CardPage;
