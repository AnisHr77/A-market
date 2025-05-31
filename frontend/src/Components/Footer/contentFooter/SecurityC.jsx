import React from 'react';

const Security = () => {
    return (<div>
            <h2 style={{textAlign:"center"}}>Security Center</h2>
            <hr/>
            <div style={styles.container}>


                <p >
                    At A+ Market, your safety is our top priority. We’re committed to ensuring a secure and protected shopping experience for all our customers.

                </p>
                <hr style={styles.hrSecurity}/>
                <h2>🔒 Secure Transactions</h2>
                <p >
                    All transactions on A+ Market are encrypted using SSL (Secure Socket Layer) technology. This ensures your payment and personal data remain confidential and protected.
                </p>
                <hr style={styles.hrSecurity}/>
                <h2 >🛡️ Account Protection</h2>
                <p >
                    We encourage customers to use strong, unique passwords and enable two-factor authentication (2FA) where possible. If we detect any suspicious activity, we’ll notify you immediately.

                </p>
                <hr style={styles.hrSecurity}/>
                <h2 >📦 Order Security</h2>
                <p >
                    Every order is tracked, and our support team monitors shipments to prevent fraud and ensure delivery to the right person.

                </p>
                <hr style={styles.hrSecurity}/>

                <h2 >📨 Report Security Issues</h2>
                <p >
                    If you notice any unusual activity or believe your account has been compromised, please contact our security team at <a href="#"  style={{ textDecoration: "none", color: "#4D6BFE" }}>security@A+market.com</a>.

                </p>
                <br/>
                <hr />
                <p  style={{  color: "#7a747e",textAlign:"center" }}>
                    Thank you for trusting A+ Market. We're always working to stay ahead of security threats and keep your data safe.
                </p>



            </div></div>
    );
};

const styles = {
    container: {
        marginLeft:"115px"
    },

    hrSecurity: {
        borderColor: "rgba(37, 40, 45, 0.37)",
        width: "100%",
        margin: "2rem 0"
    },
};

export default Security;
