import React from 'react';

const Privacy = () => {
    return (<div>
            <h2 style={{textAlign:"center"}}>Privacy Policy</h2>
            <hr/>
            <div style={styles.container}>


                <p >
                    At A+ Market, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit or make a purchase from our website.
                </p>
                <hr style={styles.hrPrivacy}/>
                <h2 >📘 Information We Collect</h2>
                <p >
                    We collect information you provide directly (such as name, email, shipping address, and payment details), as well as data gathered automatically (such as browsing behavior, IP address, and device information).
                </p>
                <hr style={styles.hrPrivacy}/>
                <h2 >💡 How We Use Your Information</h2>
                <ul >
                    <li>To process and deliver your orders</li>
                    <li>To provide customer support</li>
                    <li>To improve and personalize your experience</li>
                    <li>To send you updates, promotions, and offers (with your consent)</li>
                </ul>
                <hr style={styles.hrPrivacy}/>
                <h2 >🔐 Data Protection</h2>
                <p >
                    We implement a range of security measures, including SSL encryption, to protect your personal data from unauthorized access, alteration, disclosure, or destruction.
                </p>

                <hr style={styles.hrPrivacy}/>



                <h2 >👥 Sharing Your Information</h2>
                <p >
                    We do not sell or rent your personal information. We may share data with trusted third-party service providers only as necessary for fulfilling our services (e.g., shipping companies, payment processors).
                </p>

                <hr style={styles.hrPrivacy}/>
                <h2 >📝 Your Rights</h2>
                <p >
                    You have the right to access, update, or delete your personal data. To exercise these rights, contact us at <a href="#" style={{ textDecoration: "none", color: "#4D6BFE" }} >privacy@A+market.com</a>.
                </p>
                <hr style={styles.hrPrivacy}/>


                <h2 >📅 Changes to This Policy</h2>
                <p >
                    We may update this policy from time to time. We will notify you of any significant changes via email or website notification.
                </p>


                <p  style={{  color: "#7a747e"}}>
                    Last updated: May 24, 2025.
                </p>
            </div></div>
    );
};

const styles = {
    container: {
        marginLeft:"115px"
    },

    hrPrivacy: {
        borderColor: "rgba(37, 40, 45, 0.37)",
        width: "100%",
        margin: "2rem 0"
    },
};

export default Privacy;
