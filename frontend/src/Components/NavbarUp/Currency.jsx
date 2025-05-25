import React from 'react'
import {useState} from "react";


const Currency = () => {
    const [Currency ,setCurrency]=useState("EUR");
    const CurrencySwitcher = (event)=> {
        setCurrency(event.target.value);
    }
    return (
        <div id="Currency-selector">
            <select value={Currency}
                    id="CurrencyDrop"
                    onChange={CurrencySwitcher}>

                <option value="Eur">EUR</option>
                <option value="USD">USD</option>
                <option value="DZD">DZD</option>
            </select>

        </div>
    )
}
export default Currency;