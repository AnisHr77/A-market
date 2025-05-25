import React from 'react';

const TrackOrder = () => {
    return (<div>
        <h2 style={{textAlign:"center"}}>📦 Track Your Order – Stay Updated, Anytime</h2>
            <hr/>
        <div style={styles.container}>

            <p >
                Want to know where your package is? We’ve got you covered.
            </p>
            <hr style={styles.hrTrack}/>
            <p >
                Use our real-time tracking system to follow your order from checkout to your doorstep.
                Simply enter your order number and email to see the latest updates.
            </p>
            <hr style={styles.hrTrack}/>
            <p >
                Because at A+ Market, your peace of mind is our priority.
            </p>
            <hr style={styles.hrTrack}/>
        </div>
        </div>
    );
};

const styles = {
    container: {
        marginLeft:"115px"
    },

    hrTrack: {
        borderColor: "rgba(37, 40, 45, 0.37)",
width: "100%",
margin: "2rem 0"
    },
};

export default TrackOrder;
