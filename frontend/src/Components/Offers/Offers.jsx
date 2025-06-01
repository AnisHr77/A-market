<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import "./offers.css";
import { OffersCard } from "./OffersCard";
import { fetchOffersData } from "./OffersData";

const Offers = () => {
    const [offersData, setOffersData] = useState([]);

    useEffect(() => {
        fetchOffersData()
            .then((data) => setOffersData(data))
            .catch((err) => console.error("Failed to fetch offers data:", err));
    }, []);

    return (
        <div id="SupperOffers">
            <div className="Offers">
                {offersData.map((productsData) => (
                    <OffersCard
                        key={productsData.id}
                        id={productsData.id}
                        category={productsData.category}
                        icon={productsData.icon}
                        image_url={productsData.image_url}
                        name={productsData.name}
                        price={productsData.price}
                        oldprice={productsData.oldprice}
                        Pourcentage={productsData.Pourcentage}
                        width={productsData.width}
                        countdown={productsData.countdown}
                        saves={productsData.saves}
                    />
                ))}
            </div>
        </div>
    );
};

=======
import React from 'react'
import "./offers.css"
import {OffersCard }from './OffersCard'
import offersData from "./OffersData";


const Offers = () => {
    return (

        <div className='Offers'>

            {offersData.map((productsData) =>(

                <OffersCard
                id={productsData.id}
                category={productsData.category}
                icon={productsData.icon}
                image={productsData.image}
                title={productsData.title}
                price={productsData.price}
                oldprice={productsData.oldprice}
                Pourcentage={productsData.Pourcentage}
                width={productsData.width}
                countdown={productsData.countdown}
                saves={productsData.saves}

                />

                ))}
        </div>

    )
}
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
export default Offers;
