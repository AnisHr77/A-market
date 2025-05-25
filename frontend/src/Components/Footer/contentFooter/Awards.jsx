import React from 'react';
import './Awards.css'

const AwardsRecognition = () => {
    return (
        <div >
            <h2 style={{textAlign:"center"}}>🏆 Awards & Recognition – Celebrating Excellence</h2>
            <hr/>
            <div className="awards-content">
            <p >
                At A+ Market, we’re honored to be recognized for our commitment to quality, innovation, and customer satisfaction.
            </p>
            <hr className={"hrAwards"}/>
            <p >
                From industry-leading eCommerce awards to community impact accolades, each recognition reflects
                the passion of our team and the trust of our customers.
            </p>
            <hr className={"hrAwards"}/>
            <p >
                These awards inspire us to continue raising the bar every day.
            </p>
            <hr className={"hrAwards"}/>
            </div>
        </div>
    );

};



export default AwardsRecognition;
