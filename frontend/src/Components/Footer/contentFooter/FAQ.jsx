import React, { useEffect } from 'react';
import './FAQ.css';

function FAQ() {
    useEffect(() => {
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                question.classList.toggle('active');
                const answer = question.nextElementSibling;
                if (answer) {
                    answer.classList.toggle('show');
                }
            });
        });

        // Clean up event listeners when the component is removed
        return () => {
            faqQuestions.forEach(question => {
                question.replaceWith(question.cloneNode(true));
            });
        };
    }, []);

    return (
        <div className="page-wrapper">
            <div className="FAQ-content">
                <h1 className="myh1FAQ">FAQ & Help Center</h1>
                <hr className="faq-hr1" />
                <div className="myh2FAQ">
                    <div className="faq-item">
                        <h2 className="faq-question">What payment options are available?</h2>
                        <div className="faq-answer">We accept payments via credit cards (Visa, MasterCard), Baridimob, Skrill, PayPal, and bank transfers.</div>
                    </div>
                    <div className="faq-item">
                        <h2 className="faq-question">How long does shipping take?</h2>
                        <div className="faq-answer">Shipping times vary depending on your location. Typically, delivery within major cities takes 3–5 business days, and it may take longer for remote areas.</div>
                    </div>
                    <div className="faq-item">
                        <h2 className="faq-question">What is your return policy?</h2>
                        <div className="faq-answer">You can return products within 3 days of receiving them. The product must be in its original condition, unused, and in its original packaging. Please see our Return & Refund Policy page for more details.</div>
                    </div>
                    <div className="faq-item">
                        <h2 className="faq-question">How can I track my order?</h2>
                        <div className="faq-answer">Once your order is shipped, you will receive an email containing your tracking number and a link to the shipping carrier's website where you can track your shipment.</div>
                    </div>
                    <div className="faq-item">
                        <h2 className="faq-question">Do you offer customer support?</h2>
                        <div className="faq-answer">
                            Yes, our customer support team is available to assist you with any questions or issues you may have.
                            You can contact us via email at <a href="#" style={{ textDecoration: "none", color: "#4D6BFE" }}>A+Market@gmail.com</a>
                            or by phone at <a href="#" style={{ textDecoration: "none", color: "#4D6BFE" }}>+213 246278955</a>.
                        </div>
                    </div>
                </div>
                <hr className="faq-hr2" />
            </div>

            <footer className="footer">
                © A+ Market 2025. All Rights Reserved.
            </footer>
        </div>
    );
}

export default FAQ;
