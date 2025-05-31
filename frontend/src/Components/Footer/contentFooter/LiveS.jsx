import React from 'react';

const LiveSupport = () => {
    return (<div>
        <h2 style={{textAlign:"center"}}>🕒 24/7 Live Support – Here When You Need Us</h2>
            <hr/>
        <div style={styles.container}>


            <p >
                Questions? Issues? Just want to chat?
            </p>
            <hr style={styles.hrLiveS}/>
            <p >
                Our support team is available <strong>24/7</strong> to help you with anything — from tracking orders to
                product details or returns.
            </p>
            <hr style={styles.hrLiveS}/>
            <p >
                Reach out via live chat, email, or phone. We’re always here to assist — anytime, every day.
            </p>
            <hr style={styles.hrLiveS}/>
        </div></div>
    );
};

const styles = {
    container: {
        marginLeft:"115px"
    },

    hrLiveS: {
        borderColor: "rgba(37, 40, 45, 0.37)",
        width: "100%",
        margin: "2rem 0"
    },
};

export default LiveSupport;
