import React from 'react';


const SustainabilityCommitment = () => {
    return (
        <div >
            <h2 style={{textAlign:"center"}}> Sustainability Commitment – For a Greener Tomorrow</h2>
            <hr/>
           <div style={styles.communitiesContainer}>
            <p >
                At A+ Market, sustainability isn't just a trend — it's a responsibility.
            </p>
               <hr style={styles.hrSustainability}/>
            <p >
                From eco-friendly packaging to energy-efficient logistics, we are committed to reducing our footprint
                at every step of the supply chain.
            </p>
               <hr style={styles.hrSustainability}/>
            <p >
                We partner with responsible suppliers and promote products that are kind to people and the planet.
            </p>
               <hr style={styles.hrSustainability}/>
            <p >
                Together, let’s shop smarter and protect our future.
            </p>
               <hr style={styles.hrSustainability}/>
            </div>
        </div>
    );
};
const styles = {
            communitiesContainer: {
        marginLeft:"115px"
    },

    hrSustainability: {
        borderColor: "rgba(37, 40, 45, 0.37)",
        width: "100%",
        margin: "2rem 0"
    },
};



export default SustainabilityCommitment;
