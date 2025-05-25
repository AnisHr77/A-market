import React from 'react';

const Security = () => {
    return (<div>
            <h2 style={{textAlign:"center"}}>Saved Items</h2>
            <hr/>
            <div style={styles.container}>


                <p >
                    All your favorite items in one place.

                </p>
                <hr style={styles.hrSavesfooter}/>
                <h2>Recently Saved</h2>
                <ul >
                    <li>Product 1</li>
                    <li>Article: "Top 10 Productivity Tools"</li>
                </ul>
                <hr style={styles.hrSavesfooter}/>
                <h2 >Manage Your Saves</h2>
                <p >
                    You can remove items or organize them into folders.

                </p>
                <hr style={styles.hrSavesfooter}/>


            </div></div>
    );
};

const styles = {
    container: {
        marginLeft:"115px"
    },

    hrSavesfooter: {
        borderColor: "rgba(37, 40, 45, 0.37)",
        width: "100%",
        margin: "2rem 0"
    },
};

export default Security;
