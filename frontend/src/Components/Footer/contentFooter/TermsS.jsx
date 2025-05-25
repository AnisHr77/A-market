import React from 'react';

const TermsS = () => {
    return (<div>
            <h2 style={{textAlign:"center"}}>Terms of Service</h2>
            <hr/>
            <div style={styles.container}>


                <p >
                    Welcome to A+ Market. By accessing or using our website, you agree to be bound by the following Terms of Service. Please read them carefully.
                </p>
                <hr style={styles.hrTermsS}/>
                <h2 >🛍️ Use of Our Services</h2>
                <p >
                    You agree to use A+ Market for lawful purposes only. You must not misuse our services or access them using unauthorized means.
                </p>
                <hr style={styles.hrTermsS}/>
                <h2 >📦 Product Information & Orders</h2>
                <p >
                    We strive to provide accurate product descriptions and pricing. However, we reserve the right to correct any errors, cancel orders, or update information at any time without notice.
                </p>
                <hr style={styles.hrTermsS}/>

                <h2 >💳 Payments</h2>
                <p >
                    All payments must be made via the methods we provide on our website. By submitting payment, you confirm that you have the authorization to use the payment method.
                </p>
                <hr style={styles.hrTermsS}/>
                <h2 >📬 Shipping & Delivery</h2>
                <p >
                    Shipping times are estimates and may vary. A+ Market is not responsible for delays caused by carriers or events beyond our control.
                </p>
                <hr style={styles.hrTermsS}/>
                <h2 >📥 Returns & Refunds</h2>
                <p >
                    Please refer to our <a href="#" style={{ textDecoration: "none", color: "#4D6BFE" }} >Return & Refund Policy</a> for information on returns and exchanges.
                </p>

                <hr style={styles.hrTermsS}/>

                <h2 >🔐 Account Security</h2>
                <p >
                    You are responsible for maintaining the confidentiality of your account credentials. Notify us immediately if you suspect unauthorized access.
                </p>
                <hr style={styles.hrTermsS}/>

                <h2 >⚖️ Limitation of Liability</h2>
                <p >
                    A+ Market shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or products.
                </p>

                <hr style={styles.hrTermsS}/>

                <h2 >📅 Changes to Terms</h2>
                <p >
                    We may update these Terms from time to time. Your continued use of the site indicates your acceptance of the updated Terms.
                </p>
                <hr style={styles.hrTermsS}/>

            </div></div>
    );
};

const styles = {
    container: {
        marginLeft:"115px"
    },

    hrTermsS: {
        borderColor: "rgba(37, 40, 45, 0.37)",
        width: "100%",
        margin: "2rem 0"
    },
};

export default TermsS;
