import React, { useState, useEffect, useRef } from 'react';
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineNotificationsOff } from "react-icons/md";

const Notification = ({ className }) => {
    const [showBox, setShowBox] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const boxRef = useRef(null);

    const handleClick = () => {
        setShowBox(prev => !prev);
    };

    const getCurrentUserId = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.user_id;
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await fetch('http://localhost:3006/api/orders');
                const orders = await res.json();
                const currentUserId = getCurrentUserId();

                const deliveredOrders = orders.filter(order =>
                    order.status === 'delivered' && order.user_id === currentUserId
                );

                const notifMessages = deliveredOrders.map(order =>
                    `✅ Your Order has been delivered!`
                );

                setNotifications(notifMessages);
            } catch (err) {
                console.error("Failed to fetch notifications", err);
            }
        };

        fetchNotifications();
    }, []);

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
            <style>{`
                @keyframes pulse {
                    0% { transform: scale(1); box-shadow: 0 0 0 rgba(255, 255, 0, 0.5); }
                    50% { transform: scale(1.2); box-shadow: 0 0 8px rgba(255, 255, 0, 0.9); }
                    100% { transform: scale(1); box-shadow: 0 0 0 rgba(255, 255, 0, 0.5); }
                }

                @keyframes fadeInSlideUp {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                .notif-item {
                    padding: 10px 14px;
                    border-bottom: 1px solid #333;
                    transition: background 0.3s;
                    animation: fadeInSlideUp 0.4s ease forwards;
                }

                .notif-item:hover {
                    background-color: rgba(255, 255, 255, 0.05);
                }
            `}</style>

            <div onClick={handleClick} style={{ cursor: "pointer", position: "relative" }}>
                <IoIosNotificationsOutline
                    id="notification"
                    style={{ color: showBox ? "#ffffff" : "#bbbbbb", fontSize: "24px" }}
                />
                {notifications.length > 0 && (
                    <span style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-5px",
                        backgroundColor: "yellow",
                        color: "#000",
                        borderRadius: "50%",
                        minWidth: "20px",
                        height: "20px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 6px rgba(255, 255, 0, 0.6)",
                        zIndex: 1000,
                        animation: "pulse 1.5s infinite ease-in-out"
                    }}>
                        {notifications.length}
                    </span>
                )}
            </div>

            {showBox && (
                <div
                    ref={boxRef}
                    style={{
                        position: "absolute",
                        top: "55px",
                        right: 0,
                        backgroundColor: "#1c1f22",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                        width: "300px",
                        height: '400px',
                        color: "#fff",
                        zIndex: 999,
                        boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
                        animation: "fadeIn 0.3s ease",
                        overflow: "hidden"
                    }}
                >
                    {/* Close Button */}
                    <div style={{ textAlign: "right", padding: "2px 12px" }}>
                        <button
                            onClick={() => {
                                setNotifications(prev => {
                                    const updated = [...prev];
                                    updated.pop(); // remove the last one
                                    if (updated.length === 0) setShowBox(false);
                                    return updated;
                                });
                            }}
                            style={{
                                background: "transparent",
                                border: "none",
                                color: "#888",
                                fontSize: "18px",
                                cursor: "pointer"
                            }}
                            aria-label="Close"
                            title="Clear one notification"
                        >
                            ✕
                        </button>

                    </div>

                    {/* Notifications Content */}
                    <div style={{ padding: "0 6px", overflowY: "auto", maxHeight: "340px" }}>
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
                                border: "0.5px solid rgba(255,255,255,0.08)",
                                borderRadius: "8px",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                                minHeight: "300px",
                                animation: "fadeInSlideUp 0.5s ease forwards",

                            }}>
                                <MdOutlineNotificationsOff size={40} color="#888" />
                                <span style={{
                                    fontWeight: "600",
                                    fontFamily: 'Arial, sans-serif',
                                    fontSize: "16px",
                                    color: "#aaa"
                                }}>
                    No notifications yet
                </span>
                            </div>
                        )}
                    </div>
                </div>

            )}
        </div>
    );
};

export default Notification;
