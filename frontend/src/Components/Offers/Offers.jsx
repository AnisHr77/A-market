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

export default Offers;
