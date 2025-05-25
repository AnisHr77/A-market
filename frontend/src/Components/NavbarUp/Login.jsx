import React, { useState, useRef } from 'react';
import { RiAccountCircleLine, RiLogoutCircleRLine } from "react-icons/ri";
import './NavbarUp.css';

const Login = () => {
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsHovered(false);
        }, 200);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <div
            className="login-wrapper"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="login-container">
                <div id="loginText" className="nav-hover-effect">
                    <RiAccountCircleLine id="account-icon" />
                </div>
            </div>

            {isHovered && (
                <ul id="loginList">
                    <li id="loginItem" onClick={handleLogout}>
                        <span className="icon"><RiLogoutCircleRLine /></span>
                        Log out
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Login;