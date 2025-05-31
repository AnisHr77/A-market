import React, { useState } from 'react';
import './PayPal.css';
import {FaCcPaypal} from "react-icons/fa6";
function PayPal() {
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Processing PayPal payment for ${email}, Amount: $${amount}`);
        // هنا تقدر تضيف API call لبايبال أو تنفيذ فعلي
    };

    return (<div className="exchangeContainer3">
            <div className="paypal-container">
                <h2 className={"h2Paypal-1"} >PayPal Payment </h2>



                <form className="paypal-form" onSubmit={handleSubmit}>

                    <label  style={{marginLeft:"-240px"}}>PayPal Email:</label>
                    <input
                        type="email"
                        id="emailPaypal"
                        placeholder="GmailPaypal.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />


                    <label htmlFor="amount">Amount (USD):</label>
                    <input
                        type="number"
                        id="amount"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required={true}
                    />

                    <button type="submit">Pay With PayPal <FaCcPaypal style={{height:"20px" ,width:"25px"}}/> </button>
                </form>
            </div></div>
    );
}

export default PayPal;
