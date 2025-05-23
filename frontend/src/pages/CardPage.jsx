import React, { useState } from 'react';
import { useCart } from '../Context/CartContext';
import './CardPage.css';
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";




const CardPage = () => {
    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
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

    const handleApplyPromo = () => {
        if (promoCode === 'ANISHR77') {
            setDiscount(10);
        } else {
            setDiscount(0);
        }}



    return (
        <div className="CardPage">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="sidebar-toggle">
                {sidebarOpen ? <MdOutlineKeyboardDoubleArrowLeft /> : <MdOutlineKeyboardDoubleArrowRight />}
            </button>

            <div className="CardPage1">


                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
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
                                    <img src={item.image} alt={item.title}/>
                                    <div style={{flexDirection: 'column'}}>
                                        <h4 style={{color: 'white'}}>{item.title}</h4>
                                        <p>{item.description}</p>
                                        <p style={{color: 'grey'}}>{item.price}$</p>
                                    </div>
                                </div>

                                <div className="quantity-container">
                                    <button className="quantity-btn" onClick={() => decreaseQuantity(item.id)}>-
                                    </button>
                                    <span className="quantity-value">{item.quantity}</span>
                                    <button className="quantity-btn" onClick={() => increaseQuantity(item.id)}>+
                                    </button>
                                </div>

                                <p id="cartprices"><strong>${(item.price * item.quantity).toFixed(2)}</strong></p>

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
                <div className="SidebarRight">
                    <div>
                        <h3>Order Summary</h3>

                        <div className="sidebar-summary-section">
                            <span>{cartCount} Items</span>
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
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <button className="checkout-btn">Checkout</button>
                </div>



            )}
        </div>
    );
};

export default CardPage;
