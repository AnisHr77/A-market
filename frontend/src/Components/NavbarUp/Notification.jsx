import React, { useState , useEffect, useRef  } from 'react';
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineNotificationsOff } from "react-icons/md"; // أيقونة عدم وجود إشعارات

const Notification = ({ className }) => {
    const [showBox, setShowBox] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const boxRef = useRef(null); // مرجع لصندوق الإشعارات

    const handleClick = () => {
        setShowBox(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (boxRef.current && !boxRef.current.contains(event.target)) {
                setShowBox(false);
            }
        };

        if (showBox) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showBox]);

    return (
        <div className={className} style={{ position: "relative" }}>
            <div onClick={handleClick} style={{ cursor: "pointer" }}>
                <IoIosNotificationsOutline
                    id="notification"
                    style={{ color: showBox ? "#ffffff" : "#bbbbbb" }}
                />
            </div>

            {showBox && (
                <div
                    ref={boxRef}
                    style={{
                        position: "absolute",
                        top: "40px",
                        right: 0,
                        backgroundColor: "#1c1f22",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                        width: "300px",
                        color: "#fff",
                        zIndex: 999,
                        boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
                        animation: "fadeIn 0.3s ease"
                    }}>
                    {notifications.length > 0 ? (
                        notifications.map((n, index) => (
                            <div key={index} style={{ padding: "8px 0", borderBottom: "1px solid #333" }}>
                                {n}
                            </div>
                        ))
                    ) : (
                        <div style={{
                            textAlign: "center",
                            justifyContent: "center",
                            color: "#bbbbbb",
                            fontSize: "14px",
                            padding: "20px 10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "12px",
                            background: "linear-gradient(to bottom, #1c1f22, #2a2e33)",
                            border: "0.5px solid rgba(255,255,255,0.08)",
                            borderRadius: "8px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                            minHeight: "400px",
                            animation: "fadeInSlideUp 0.5s ease forwards"
                        }}>
                            <MdOutlineNotificationsOff
                                size={40}
                                color="#888"
                                style={{ animation: "fadeInSlideUp 0.6s ease forwards" }}
                            />
                            <span style={{
                                fontWeight: "600",
                                fontFamily: 'Arial, sans-serif',
                                fontSize: "16px",
                                color: "#aaa",
                                animation: "fadeInSlideUp 0.7s ease forwards"
                            }}>
        No notifications yet
    </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Notification;


