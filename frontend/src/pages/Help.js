import React from 'react';
import './help.css';
import { useState } from 'react';


function Help() {


    const [selected,setselected] = useState(null);

    const toggle =(i) => {
        if(selected ===i){    return setselected(null)}
        setselected(i)


    }


    const topics = [
        {question:"Unknown charges",
            answer:"this is answer"

        },
        {question:"How to return or exchange an item on A-market",
            answer:"this is answer"
        },
        {question:"How do I ship my items back?", answer:"The unknown charge is a bank authorization When you place an order, A-market contacts the issuing bank to confirm the validity of the payment method. Your bank reserves the funds until the transaction processes or the authorization expires. This reservation appears immediately in your statement, but it isnt an actual chargeIf you cancel your order, the authorization is removed from your account according to the policies of your bank. Contact your bank to clarify how long they hold authorizations for online orders.I see a charge on my credit card that I don't recognizeIf you see a purchase or credit card charge you don't recognize, check with any family members, friends or coworkers who may have had access to your device or permission to use your card.If you believe your A-market account has been compromised, sign in to change your password.From your Account security, Edit the Password and change your Temu password.If you still need help, you'll be asked to provide as much information as possible to help us resolve your issue. For your security, please don't include your full bank account information."},
        {question:"Why can't I find my order in my account?", answer:"this is answer"},
        {question:"How do I change the notification settings?", answer:"this is answer"},
        {question:"Protect Yourself from Spam Text Messages and Phishing Scams", answer:"this is answer"},
        {question:"Report Something Suspicious on A-market", answer:"this is answer"},
        {question:"My tracking info says my package was delivered, but I haven't received it.", answer:"this is answer"},
        {question:"What should I do if I am missing item(s) from my order?", answer:"this is answer"},
        {question:"How do I track my refund?", answer:"this is answer"},
        {question:"What if I received an item damaged or not as described?", answer:"this is answer"},
        {question:"Is it safe to shop on A-market? How will my information be used?", answer:"this is answer"}
    ];

    return (

        <div className="app-container"
             style={{
                 backgroundColor:'rgba(255, 255, 255, 0.77)',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat',
                 minHeight: '100vh',
                 padding: '20px',
             }}
        >
            <h2>
                Welcom to the help center how can we help you?
            </h2>
            <h1>Recommended topics</h1>
            <div className="topics-grid">
                {topics.map((topic, index) => (
                    <div key={index}>
                        <div className="topic-item" onClick={() => toggle(index)}>
                            <span className="question">{topic.question}</span>
                            <span className="arrow">{selected === index ? '▼' : '►'}</span>
                        </div>
                        <div className={selected === index ? 'answer show' : 'answer'}>
                            {topic.answer}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Help;