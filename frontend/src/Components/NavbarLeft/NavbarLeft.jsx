<<<<<<< HEAD
import React from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
import './NavbarLeft.css';
import { MdOutlineExplore } from "react-icons/md";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { PiUsersBold } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
import { LuMenu } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa";
import { IoMoonOutline } from "react-icons/io5";
import { BsQuestionOctagon } from "react-icons/bs";
import { RiSettingsLine } from "react-icons/ri";
import { useCart } from '../../Context/CartContext';
import LogoImg from "../Assets/logo.png";
<<<<<<< HEAD

const NavbarLeft = () => {
    const { cartCount } = useCart();

    return (
        <div className="navbar-left">
            <div className="Container-icones">
                <a href="/" className="logo-link">
                    <img className="logoImg" src={LogoImg} alt="Logo" />
                    <span style={{position:'relative',top:'5px',fontSize:'24px'}}>Market</span>
=======
import iconsun from "./iconsun.gif";


import { Link } from 'react-router-dom';

const NavbarLeft = () => {
    const { cartCount } = useCart();
    const [darkMode, setDarkMode] = useState(false);

    
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode) setDarkMode(savedMode === 'true');
    }, []);

    // Apply theme to body and save preference
    useEffect(() => {
        document.body.className = darkMode ? 'dark-mode' : 'light-mode';
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className="navbar-left"> {/* Remove dark-mode class here */}
            <div className="Container-icones">
                <a href="/" className="logo-link">
                    <img className="logoImg" src={LogoImg} alt="Logo" />
                    <span style={{position:'relative', top:'5px', fontSize:'24px'}}>Market</span>
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
                </a>

                <div className="icons">
                    <a href="/"><MdOutlineExplore id="Explore" /><span>Explore</span></a>
<<<<<<< HEAD

                    <a href="/Card" style={{ position: 'relative' }}>
                        <PiShoppingCartSimpleBold id="shoppingCart" />
                        <span>Cart</span>
                        {cartCount > 0 && (
                            <p id="counter">
                                {cartCount}
                            </p>
                        )}
                    </a>

                    <a href="/Chat"><PiUsersBold id="friends" /><span>Chat</span></a>
                    <a href="/Delivry"><TbTruckDelivery id="Deliveries" /><span>Deliveries</span></a>
                    <a href="/Menu"><LuMenu id="menu" /><span>Menu</span></a>
=======
                    <a href="/Card" style={{ position: 'relative' }}> 
                        <PiShoppingCartSimpleBold id="shoppingCart" />
                        <span>Cart</span>
                        {cartCount > 0 && (
                            <p id="counter">{cartCount}</p>
                        )}
                    </a>
                    
                    <a href="/Chat"><PiUsersBold id="friends" /><span>Chat</span></a>
                    <a href="/Delivry"><TbTruckDelivery id="Deliveries" /><span>Deliveries</span></a>
                    <a href="#"><LuMenu id="menu" /><span>Menu</span></a>
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
                    <a href="/Bookmark"><FaRegBookmark id="Bookmark" /><span>Bookmark</span></a>

                    <div id="ligne"></div>

<<<<<<< HEAD
                    <a href="#"><IoMoonOutline id="moon" /><span>Toggle</span></a>
                    <a href="/help"><BsQuestionOctagon id="question" /><span>Help</span></a>
=======
                    <a href="#" onClick={toggleTheme}>
                    {darkMode ? (
                        <img src={iconsun} alt="Light Mode" style={{ width: '20px', height: '20px' }} />

                        
                        ) : (
                            <IoMoonOutline id="moon" />
                        )}
                        <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                    </a>
                    <a href="/Help"><BsQuestionOctagon id="question" /><span>Help</span></a>
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
                    <a href="/Settings"><RiSettingsLine id="settings" /><span>Settings</span></a>
                </div>
            </div>
        </div>
    );
};

<<<<<<< HEAD
export default NavbarLeft;
=======
export default NavbarLeft; 
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
