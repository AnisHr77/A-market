import React from 'react'
import {useState} from "react";


const Languages = () => {
    const [Language ,setLanguage]=useState("ENG");
    const LanguageSwitcher = (event)=> {
        setLanguage(event.target.value);
    }
    return (
        <div id="Language-selector">
            <select value={Language}
                    id="CurrencyDrop"
                    onChange={LanguageSwitcher}>

                <option value="ENG">ENG</option>
                <option value="FE">FR</option>
                <option value="AR">AR</option>
            </select>

        </div>
    )
}
export default Languages;