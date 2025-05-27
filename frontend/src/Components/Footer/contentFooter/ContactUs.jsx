// src/pages/ContactUs.jsx
import React from 'react';
import './ContactUs.css'

const ContactUs = () => {
    return (
        <div className="ContactUs-con">
            <h1 className={"h1Contactus"}>Contact Us</h1>
<hr/>
            <div className="content-ContactUs">
            <h2>Get in Touch</h2>

            <p className={"pOfContactUs"}>Address: 123 A+ Market Street, Blida, Algeria.</p>

            <p className={"pOfContactUs"}>📧 Email: <a href={"#"} className={"aContactUs"}>support@A+market.com</a>.</p>
            <p className={"pOfContactUs"}>🕐 Working Hours: Sunday - Thursday, 9:00 AM - 6:00 PM.</p>
                <hr className={"hrContactUs"}/>
            <h2>Send Us a Message</h2>

            <textarea className={'textareaContactUs'}
                placeholder="Your Message,Tell us what you need assistance with..."
                rows="5"

            ></textarea>


                <hr className={"hrContactUs"}/>
            </div>
            </div>

    );
};

export default ContactUs;
