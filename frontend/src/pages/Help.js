import React, { useState } from 'react';
import './help.css';

function Help() {
    const [selected, setSelected] = useState(null);

    const toggle = (i) => {
        if (selected === i) return setSelected(null);
        setSelected(i);
    };

    const topics = [
        {
            question: "Unknown charges",
            answer:
                "An unknown charge may be a temporary bank authorization. When you place an order, A+market contacts your bank to confirm the payment method. This may appear as a pending charge but isn't an actual deduction. If you cancel the order, the bank should remove the authorization shortly. Contact your bank for further details."
        },
        {
            question: "How to return or exchange an item on A+market",
            answer:
                "To return or exchange an item on A+market, go to your order history, select the item, and click 'Return or Replace Item'. Follow the steps to print a return label and schedule a pickup or drop it off at the nearest courier."
        },
        {
            question: "How do I ship my items back?",
            answer:
                "To ship items back to A+market, use the return label provided during the return request process. Make sure to package the item securely, attach the label, and drop it off at the designated carrier. Keep your tracking number for reference."
        },
        {
            question: "Why can't I find my order in my account?",
            answer:
                "If your order doesn’t appear in your A+market account, ensure you are logged in with the correct email. Check your inbox for the confirmation email. If still missing, contact A+market support with your order details."
        },
        {
            question: "How do I change the notification settings?",
            answer:
                "To change your A+market notification settings, go to Account > Notification Settings. From there, you can manage email, push, and SMS alerts according to your preferences."
        },
        {
            question: "Protect Yourself from Spam Text Messages and Phishing Scams",
            answer:
                "Never click suspicious links or share personal info in response to texts/emails. A+market will never ask for sensitive details through such messages. Report any suspicious communication to A+market support."
        },
        {
            question: "Report Something Suspicious on A+market",
            answer:
                "If you encounter suspicious activity or listings on A+market, report it by clicking the 'Report' button near the listing or contact customer service directly."
        },
        {
            question: "My tracking info says my package was delivered, but I haven't received it.",
            answer:
                "Double-check around your property and with neighbors. If still missing, wait 24 hours, then contact A+market support for assistance or to file a claim."
        },
        {
            question: "What should I do if I am missing item(s) from my order?",
            answer:
                "If items are missing from your A+market delivery, review your order details to confirm what was shipped. If confirmed missing, contact A+market customer support for a refund or reshipment."
        },
        {
            question: "How do I track my refund?",
            answer:
                "To track your refund on A+market, go to Orders > Returns & Refunds. You’ll see the refund status and estimated time for processing back to your payment method."
        },
        {
            question: "What if I received an item damaged or not as described?",
            answer:
                "If your A+market order arrived damaged or not as described, start a return by selecting the item in your order history and choosing the appropriate return reason. Include photos for faster resolution."
        },
        {
            question: "Is it safe to shop on A+market? How will my information be used?",
            answer:
                "Yes, A+market uses encryption and strict data protection to ensure safety. Your personal info is used only to fulfill orders, improve service, and comply with legal obligations."
        }
    ];

    return (
        <div
            className="app-container"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.77)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                padding: '20px',
            }}
        >
            <h2>Welcome to the help center, how can we help you?</h2>
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
