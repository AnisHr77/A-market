import React from 'react';

const Security = () => {
    return (<div>
            <h2 style={{textAlign:"center"}}>Card Management</h2>
            <hr/>
            <div style={styles.container}>


                <p >
                    Securely manage your saved payment methods and billing information.

                </p>
                <hr style={styles.hrCardFooter}/>
                <h2>Your Saved Cards</h2>
                <ul >
                    <li>Visa ending in **** 1234</li>
                    <li>MasterCard ending in **** 5678</li>
                </ul>
                <hr style={styles.hrCardFooter}/>
                <h2 >Actions</h2>
                <p >
                    You can add, remove, or update your payment methods anytime.

                </p>
                <hr style={styles.hrCardFooter}/>


            </div></div>
    );
};

const styles = {
    container: {
        marginLeft:"115px"
    },

    hrCardFooter: {
        borderColor: "rgba(37, 40, 45, 0.37)",
        width: "100%",
        margin: "2rem 0"
    },
};

export default Security;
