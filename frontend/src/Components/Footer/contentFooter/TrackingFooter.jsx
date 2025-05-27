import React from 'react';

const Security = () => {
    return (<div>
            <h2 style={{textAlign:"center"}}>Order Tracking</h2>
            <hr/>
            <div style={styles.container}>


                <p >
                    Keep an eye on the status of your shipments.

                </p>
                <hr style={styles.hrTrackingfooter}/>
                <h2>Your Orders</h2>
                <ul >
                    <li>Order #123456 – In Transit</li>
                    <li>Order #987654 – Delivered</li>
                </ul>

                <hr style={styles.hrTrackingfooter}/>
                <h2 >Need Help?</h2>
                <p >
                    If you're experiencing issues with tracking, contact support.

                </p>
                <hr style={styles.hrTrackingfooter}/>


            </div></div>
    );
};

const styles = {
    container: {
        marginLeft:"115px"
    },

    hrTrackingfooter: {
        borderColor: "rgba(37, 40, 45, 0.37)",
        width: "100%",
        margin: "2rem 0"
    },
};

export default Security;
