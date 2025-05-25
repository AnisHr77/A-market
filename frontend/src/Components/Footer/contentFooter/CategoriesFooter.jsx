import React from 'react';

const Security = () => {
    return (<div>
            <h2 style={{textAlign:"center"}}>Categories</h2>
            <hr/>
            <div style={styles.container}>


                <p >
                    Explore and organize products by category.

                </p>
                <hr style={styles.hrCategoriesfooter}/>
                <h2>Popular Categories</h2>
                <ul >
                    <li>Technology</li>
                    <li>Fashion</li>
                    <li>Home & Garden</li>
                    <li>Fitness</li>
                </ul>
                <hr style={styles.hrCategoriesfooter}/>

                <h2 >Manage Your Categories</h2>
                <p >You can create, rename, or delete categories.</p>
                <hr style={styles.hrCategoriesfooter}/>




            </div></div>
    );
};

const styles = {
    container: {
        marginLeft:"115px"
    },

    hrCategoriesfooter: {
        borderColor: "rgba(37, 40, 45, 0.37)",
        width: "100%",
        margin: "2rem 0"
    },
};

export default Security;
