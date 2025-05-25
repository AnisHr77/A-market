import React from 'react';

const IntellectuaIP = () => {
    return (<div>
            <h2 style={{textAlign:"center"}}>Intellectual Property</h2>
            <hr/>
            <div style={styles.container}>


                <p >
                    At A+ Market, we respect and protect intellectual property rights. This page outlines our policy and practices regarding trademarks, copyrights, and other protected content.
                </p>
                <hr style={styles.hrIntellectuaIP}/>
                <h2 >📛 Trademarks</h2>
                <p >
                    All logos, brand names, product names, and service names used on this site are trademarks or registered trademarks of A+ Market or third parties. Use of these marks without written permission is strictly prohibited.
                </p>
                <hr style={styles.hrIntellectuaIP}/>
                <h2>📚 Copyright</h2>
                <p >
                    All content on A+ Market, including text, images, graphics, videos, design elements, and code, is protected by copyright laws. You may not reproduce, distribute, or modify any content without express permission.
                </p>
                <hr style={styles.hrIntellectuaIP}/>

                <h2 >🛒 Product Listings & Images</h2>
                <p >
                    Product images and descriptions are either owned by A+ Market or used with permission. Unauthorized use of these materials for commercial or personal purposes is not allowed.
                </p>
                <hr style={styles.hrIntellectuaIP}/>

                <h2 >📨 Reporting IP Violations</h2>
                <p>
                    If you believe that your intellectual property rights have been violated on our platform, please contact us at <a href="#" style={{ textDecoration: "none", color: "#4D6BFE" }}>IP@A+market.com</a> with details of the infringement.
                </p>

                <hr style={styles.hrIntellectuaIP}/>


                <h2 >📘 Use of Our Content</h2>
                <p >
                    You may use our content for personal, non-commercial purposes only. Any other use requires prior written approval from A+ Market.
                </p>
                <hr style={styles.hrIntellectuaIP}/>



            </div></div>
    );
};

const styles = {
    container: {
        marginLeft:"115px"
    },

    hrIntellectuaIP: {
        borderColor: "rgba(37, 40, 45, 0.37)",
        width: "100%",
        margin: "2rem 0"
    },
};

export default IntellectuaIP;
