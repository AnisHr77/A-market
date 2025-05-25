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

                <SearchIA className="nav-hover-effect"/>
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