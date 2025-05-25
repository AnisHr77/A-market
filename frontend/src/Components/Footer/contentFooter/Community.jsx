import React from 'react';
import './Comminuty.css';
import { FaEarthAmericas } from "react-icons/fa6";

const CommunityImpact = () => {
    return (
        <div className={"communities-container-ALL"}>
            <h1 className={"ComunityH1"}><FaEarthAmericas style={{color:'#25678F'}}/> Community Impact – Giving Back Matters</h1>
            <hr/>
            <div className="communities-container">
            <p >
                At A+ Market, we believe in creating more than just transactions — we believe in building communities.
            </p>
                <hr className={"hrCommunity"}/>
            <p >
                That’s why we support local businesses, promote fair trade, and contribute to causes that matter.
                Every purchase you make helps us invest in education, sustainability, and social programs across our network.
            </p>
                <hr className={"hrCommunity"}/>
            <p >
                Together, we’re creating a positive impact — one order at a time.
            </p></div>
                <hr className={"hrCommunity"}/>

        </div>
    );
};



export default CommunityImpact;
