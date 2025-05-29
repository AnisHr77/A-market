import React from 'react'
import {useState} from "react";
import './NavbarUp.css';
import Categories from './Categories.jsx';
import Currency from './Currency.jsx';
import SearchIA from './SearchIA.jsx';
import Reorder from './Reorde.jsx';
import SearchBar from './SearchBar.jsx';
import Languages from"./LanguageSelect.jsx"
import Login from './Login.jsx'
import Notification from "./Notification";

const NavbarUp   = () => {
    const [Menu, setMenu] = useState("");

    return (
        <div className="nav-bar">
            <div className="Conatiner">
                <Currency />
                <Categories className="nav-hover-effect"/>

                <a href="/IA">

                    <div id="SearchIA">
                        <div  id='searchIA'>
                            Search By </div>
                        <svg id='IA' width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.8303 2.32901L14.5976 0H15.9309L16.6981 2.32901L19 3.10535V4.45439L16.6981 5.23073L15.9309 7.55974H14.5976L13.8303 5.23073L11.5284 4.45439V3.10535L13.8303 2.32901Z" fill="#FFFCFF"/>
                            <path d="M16.4354 9.70492V18H14.093V9.70492H16.4354Z" fill="#FFFCFF"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.94734 2.59486H7.84201L11.7892 18H9.3694L8.45851 14.445H3.33075L2.41982 18H0L3.94734 2.59486ZM3.93803 12.0749H7.85124L6.02945 4.96488H5.75988L3.93803 12.0749Z" fill="#FFFCFF"/>
                        </svg>



                    </div>

                </a>

                <Reorder className="nav-hover-effect"/>
                <SearchBar />
                <Languages />
                <Notification className="nav-hover-effect"/>
                <Login className="nav-hover-effect"/>

            </div>
        </div>
    )

}
export default NavbarUp;