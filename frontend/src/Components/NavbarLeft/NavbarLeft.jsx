import React from 'react';
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

const NavbarLeft = () => {
    const { cartCount } = useCart();

    return (
        <div className="navbar-left">
            <div className="Container-icones">
                <a href="/" className="logo-link">
                    <img className="logoImg" src={LogoImg} alt="Logo" />
                    <span style={{position:'relative',top:'5px',fontSize:'24px'}}>Market</span>
                </a>

                <div className="icons">
                    <a href="/"><MdOutlineExplore id="Explore" /><span>Explore</span></a>

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
                    <a href="#"><LuMenu id="menu" /><span>Menu</span></a>
                    <a href="/Bookmark"><FaRegBookmark id="Bookmark" /><span>Bookmark</span></a>

                    <div id="ligne"></div>

                    <a href="#"><IoMoonOutline id="moon" /><span>Toggle</span></a>
                    <a href="/help"><BsQuestionOctagon id="question" /><span>Help</span></a>
                    <a href="/Settings"><RiSettingsLine id="settings" /><span>Settings</span></a>
                </div>
            </div>
        </div>
    );
};

export default NavbarLeft;
