import React, { useState } from "react";
import './Notification.css';
import Switch from './Switch.jsx';

function General() {
    const [language, setLanguage] = useState("fr");
    const [currency, setCurrency] = useState("DZD");
    const [country, setCountry] = useState("Algeria");

    return (
        <div className="notification-container">
            <h2 className="myH2-1-Notification" >Notifications 📣</h2>

            <div className="notifications-section">
                <div className={"UU"}>
                <div className="checkbox-group">
                    <input type="checkbox" id="email" />
                    <div className="checkbox-content">
                        <label htmlFor="email" className="label-title">Email Notification</label>
                        <span className="label-desc">You will be notified when a new email arrives.</span>
                    </div>
                </div>

                <div className="checkbox-group">
                    <input type="checkbox" id="sound" />
                    <div className="checkbox-content">
                        <label htmlFor="sound" className="label-title">Sound Notification</label>
                        <span className="label-desc">You will be notified with sound when someone messages you.</span>
                    </div>
                </div>
                </div>
<div className={"UU"} style={{marginLeft:'500px'}}>

                <div className="checkbox-group">
                    <input type="checkbox" id="order" />
                    <div className="checkbox-content">
                        <label htmlFor="order" className="label-title">Order Tracking Notifications</label>
                        <span className="label-desc">You will be notified when the order arrives.</span>
                    </div>
                </div>


                <div className="checkbox-group">
                    <input type="checkbox" id="offers" />
                    <div className="checkbox-content">
                        <label htmlFor="offers" className="label-title">Notifications of Offers and Discounts</label>
                        <span className="label-desc">Receive notifications about exclusive promotions.</span>
                    </div>
                </div>
            </div>
            </div>
            <hr className="hr1" style={{ marginTop: "50px" }} />

            <div className="Line2-General">
                <div className="language">
                    <h2 className="text-selectH2">Language 🌐</h2>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option value="fr">Français</option>
                        <option value="ar">العربية</option>
                        <option value="en">English</option>
                    </select>
                </div>

                <div className="coins">
                    <h2 className="text-selectH2">Currency 💵</h2>
                    <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                        <option value="DZD">DZD</option>
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="CRYPTO">CRYPTO</option>
                    </select>
                </div>

                <div className="country">
                    <h2 className="text-selectH2">Country 🌍</h2>
                    <select value={country} onChange={(e) => setCountry(e.target.value)}>
                        <option value="Algeria">Algeria 🇩🇿</option>
                        <option value="France">France 🇫🇷</option>
                        <option value="UnitedStates">United States 🇺🇸</option>
                        <option value="Chine">Chine 🇨🇳</option>
                    </select>
                </div>
            </div>

            <hr className="hr2" style={{ marginTop: "120px" }} />

            <div className="dark-mode">
                <h2 style={{ position: "absolute", top: "530px",left:"43px" }}>Dark🌙/Light🔆</h2>
                <Switch  />
            </div>

            <hr className="hr3" style={{ marginTop: "430px", }} />
        </div>
    );
}

export default General;
