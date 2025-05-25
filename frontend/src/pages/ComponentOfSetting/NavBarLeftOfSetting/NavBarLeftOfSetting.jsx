import './NavBarLeftOfSetting.css';
import LOGO from '../../../Components/Assets/logo.png';
import { IoSearch } from "react-icons/io5";
import { FaHome, FaStar } from "react-icons/fa";
import { MdOutlineHelp, MdOutlinePayment } from "react-icons/md";
import { PiUsersBold } from "react-icons/pi";
import { IoIosCard } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";
import React from "react";

function NavBarLeftOfSetting(props) {
    const location = useLocation();

    // Helper function to check active state
    const isActive = (path) => {
        return location.pathname.startsWith(`/Settings/${path}`);
    };

    return (
        <div className="Menu">
            <div className="Logo">
                <a href="/"><img src={LOGO} alt="A+" /><label className="A-text">Market</label></a>
            </div>

            <div className="NavMenu">
                <div className="Search-Menu1">
                    <IoSearch style={{ width: "30px", height: "22px", color: "white" }} />
                    <input className={"input--1"} type="search" placeholder="Search" />
                </div>

                <div className="Menu-List">
                    <NavLink
                        to="/Settings/General/Notification"  // Direct link to Notification
                        className={({ isActive }) =>
                            isActive || location.pathname.startsWith('/Settings/General')
                                ? 'item active'
                                : 'item'
                        }
                    >
                        <FaHome style={{fontSize:"20px"}}/> General
                    </NavLink>
                    <NavLink
                        to="/Settings/Profile/User"  // Direct link to default subpage
                        className={({ isActive }) =>
                            isActive || location.pathname.startsWith('/Settings/Profile')
                                ? 'item active'
                                : 'item'
                        }
                    >
                        <PiUsersBold style={{fontSize:"20px"}}/> Profile
                    </NavLink>
                    <NavLink
                        to="/Settings/Payment/Crypto"  // Direct link to default subpage
                        className={({ isActive }) =>
                            isActive || location.pathname.startsWith('/Settings/Payment')
                                ? 'item active'
                                : 'item'
                        }
                    >
                        <MdOutlinePayment style={{fontSize:"20px"}} /> Payment
                    </NavLink>
                    <NavLink
                        to="/Settings/Subscription/Offers"  // Direct link to default subpage
                        className={({ isActive }) =>
                            isActive || location.pathname.startsWith('/Settings/Subscription')
                                ? 'item active'
                                : 'item'
                        }
                    >
                        <IoIosCard style={{fontSize:"20px"}} /> Subscription
                    </NavLink>{/*
                    <NavLink
                        to="/Settings/HelpSupports/Help"  // Direct link to default subpage
                        className={({ isActive }) =>
                            isActive || location.pathname.startsWith('/Settings/HelpSupports')
                                ? 'item active'
                                : 'item'
                        }
                    >
                        <MdOutlineHelp style={{fontSize:"20px"}} /> Help Supports
                    </NavLink>*/}
                </div>

                <div className="Search-Menu2">
                    <br />
                    <a href="#">Go Pro</a>
                    <FaStar className="StarIcon" />
                </div>

                <br />
                <hr className={"hrNav"}/>

                <div className="MyProfile">
                    <a href="#">
                        <img className="ImgProfile" src={props.ImageTest} alt="Profile" style={{
                            width: '40px',
                            height: '40px',
                            marginLeft: "25px",
                            borderRadius: "100px"
                        }} />
                    </a>
                    <h4 className="USERNAME">
                        <a href="#">Username:{props.username}</a><br />
                        <a className="profile" href="#">Profile:{props.profile}</a>
                    </h4>
                    <button id="BtnSortie"><FiLogOut /></button>
                </div>
            </div>
        </div>
    );
}

export default NavBarLeftOfSetting;