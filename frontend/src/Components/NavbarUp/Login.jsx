import React, { useState, useEffect, useRef } from 'react';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import './NavbarUp.css';

const Login = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [userImage, setUserImage] = useState(null);
    const timeoutRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // جلب بيانات المستخدم من localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedData = JSON.parse(userData);
            if (parsedData && parsedData.profile_image) {
                setUserImage(parsedData.profile_image);
            }
        }
    }, []);

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
        localStorage.removeItem('user');
        setUserImage(null);
        // لا نقوم بإعادة تحميل الصفحة، فقط نمسح البيانات
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div
            className="login-wrapper"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="login-container" >
                <div id="loginText" className="nav-hover-effect">
                    {userImage ? (
                        <img
                            src={userImage}
                            alt="User Profile"
                            style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                border: "1px solid #ccc"
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                backgroundColor: "#888",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "16px",
                                color: "#fff"
                            }}
                        >
                            ?
                        </div>
                    )}
                </div>
            </div>

            {isHovered && (
                <ul id="loginList">
                    {userImage ? (
                        <li id="loginItem" onClick={handleLogout}>
                            <span className="icon"><RiLogoutCircleRLine /></span>
                            Logout
                        </li>
                    ) : (
                        <li id="loginItem" onClick={handleLoginClick}>
                            <span className="icon"><RiLogoutCircleRLine /></span>
                            Login
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Login;
