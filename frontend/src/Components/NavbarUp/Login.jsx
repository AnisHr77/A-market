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
        const userId = localStorage.getItem('user_id'); // You must store this on login

        if (userId) {
            fetch(`http://localhost:3006/api/users/${userId}`)
                .then(res => res.json())
                .then(data => {
                    if (data && data.profile_image) {
                        setUserImage(`http://localhost:3006/uploads/${data.profile_image}`);
                    }
                })
                .catch(err => {
                    console.error("Failed to fetch user data:", err);
                });
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
        localStorage.removeItem('token');
        localStorage.removeItem('user_id'); // Also remove user ID
        window.location.reload();
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
                            alt="User"
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
                    <a href="/login">
                    <li id="loginItem" onClick={handleLogout}>
                        <span className="icon"><RiLogoutCircleRLine /></span>
                        Log out
                    </li>
                    </a>
                </ul>
            )}
        </div>
    );
};

export default Login;
