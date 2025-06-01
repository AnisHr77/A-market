<<<<<<< HEAD
import "./SearchIA.css";
import React, { useState, useEffect, useRef } from "react";

function Chatbot() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialView, setIsInitialView] = useState(true);
    const [isTransitioningOut, setIsTransitioningOut] = useState(false);

    const messagesEndRef = useRef(null);
    const headerRef = useRef(null);
    const inputRef = useRef(null);

    const [headerHeight, setHeaderHeight] = useState(0);
    const [inputHeight, setInputHeight] = useState(0);

    // We do NOT load messages from localStorage here to always start fresh
    // On mount, just ensure initial view is active
    useEffect(() => {
        setIsInitialView(true);
    }, []);

    // When messages change and we are still in initial view, start transition out
    useEffect(() => {
        if (messages.length > 0 && isInitialView && !isTransitioningOut) {
            setIsTransitioningOut(true);
            setTimeout(() => {
                setIsInitialView(false);
                setIsTransitioningOut(false);
            }, 600); // match your CSS transition duration
        }

        // If all messages cleared, return to initial view
        if (messages.length === 0 && !isInitialView) {
            setIsInitialView(true);
        }
    }, [messages, isInitialView, isTransitioningOut]);

    useEffect(() => {
        if (!isInitialView) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isInitialView]);

    useEffect(() => {
        if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
        if (inputRef.current) setInputHeight(inputRef.current.offsetHeight);
    }, [isInitialView, messages]);

    const generateBotResponse = async (chatHistory) => {
        const transformedChatHistory = chatHistory.map(({ sender, text }) => ({
            role: sender === "user" ? "user" : "model",
            parts: [{ text }],
        }));

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                contents: transformedChatHistory,
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        };

        try {
            const response = await fetch(process.env.REACT_APP_API_URL, requestOptions);
            const responseText = await response.text();

            if (!response.ok) {
                let errorDetails = `API request failed with status ${response.status}`;
                try {
                    const errorData = JSON.parse(responseText);
                    errorDetails = errorData?.error?.message || errorData?.message || errorDetails;
                } catch (e) {
                    errorDetails = `API request failed with status ${response.status}. Response body: ${responseText.substring(0, 200)}`;
                }
                throw new Error(errorDetails);
            }

            const data = JSON.parse(responseText);
            let botText = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!botText) {
                throw new Error("API returned no valid response candidates or text.");
            }

            // Format the response text
            botText = botText
                // Replace markdown headers
                .replace(/^#+\s+(.+)$/gm, '<h2 style="color: #2c3e50; margin: 10px 0;">$1</h2>')
                // Replace bold text
                .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #2c3e50;">$1</strong>')
                // Replace lists
                .replace(/^\*\s+(.+)$/gm, '<li style="margin: 5px 0 5px 20px;">$1</li>')
                // Add paragraph breaks
                .replace(/\n\n/g, '</p><p>')
                // Wrap lists in ul tags
                .replace(/(<li>.*<\/li>)/gs, '<ul style="margin: 10px 0;">$1</ul>')
                // Wrap the whole text
                .replace(/^(.+)$/s, '<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">$1</div>');

            return botText;
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    };

    // Add this function to render HTML content
    const renderMessage = (text) => {
        return <div dangerouslySetInnerHTML={{ __html: text }} />;
    };

    const handleSendMessage = async () => {
        if (!message.trim() || isLoading) return;

        const userMessage = {
            text: message,
            sender: "user",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setMessage("");
        setIsLoading(true);

        try {
            const botText = await generateBotResponse(updatedMessages);
            const botResponse = {
                text: botText,
                sender: "bot",
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };
            setMessages((prev) => [...prev, botResponse]);
        } catch (error) {
            const errorMessage = {
                text: error.message || "Sorry, I encountered an error generating a response.",
                sender: "bot",
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !isLoading) {
            handleSendMessage();
        }
    };

    if (isInitialView) {
        return (
            <div className={`bodyIA initial-grok-page ${isTransitioningOut ? "transitioning-out" : ""}`}>
                <div className="initial-grok-layout-content">
                    <div className="chatbot-header-initial">
                        <div className="myH2-AIChat">
                            <span className="text-box">ChatA+</span>
                            <div className="icon-box">
                                <svg
                                    className="ai-icon"
                                    width="100"
                                    height="100"
                                    style={{ position: "relative", left: "-2px", top: "11px" }}
                                    viewBox="0 0 100 100"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M58.014 26.7172L58.9024 24H60.4463L61.3347 26.7172L64 27.6229V29.1968L61.3347 30.1025L60.4463 32.8197H58.9024L58.014 30.1025L55.3487 29.1968V27.6229L58.014 26.7172Z"
                                        fill="#FFFCFF"
                                    />
                                    <path d="M61.0305 35.3224V45H58.3182V35.3224H61.0305Z" fill="#FFFCFF" />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M46.5706 27.0273H51.0802L55.6507 45H52.8488L51.7941 40.8525H45.8567L44.8019 45H42L46.5706 27.0273ZM46.5598 38.0874H51.0909L48.9815 29.7924H48.6693L46.5598 38.0874Z"
                                        fill="#FFFCFF"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="chatbot-input-grok-style initial-input-layout">
                        <input
                            className="myInput-AIChat"
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="What do you want to know?"
                            disabled={isLoading}
                            autoFocus
                        />
                        {!isLoading && message.trim() && (
                            <button
                                className="myBtn-AIChat"
                                onClick={handleSendMessage}
                                disabled={isLoading || !message.trim()}
                            >
                                Send
                            </button>
                        )}
                        {isLoading && (
                            <button className="myBtn-AIChat" disabled>
                                Sending...
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="bodyIA chat-active-page"
            style={{
                "--header-height": `${headerHeight}px`,
                "--input-height": `${inputHeight}px`,
                "--chat-padding-x": "20px",
                "--chat-padding-top": "20px",
                "--chat-padding-bottom": "20px",
            }}
        >
            <div className="chatbot-header-active" ref={headerRef}>
                <div>
                    <span></span>
                    <div></div>
                </div>
            </div>

            <div className="chatbot-messages-active">
                <div className="chatbot-messages-content">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chatbot-message ${msg.sender}`}>
                            <div className="message-text">
                                {renderMessage(msg.text)}
                            </div>
                            <div className="message-time">{msg.timestamp}</div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="chatbot-message bot typing-indicator">
                            <div className="message-text">Typing...</div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="chatbot-input-grok-style chat-active-input-layout" ref={inputRef}>
                <input
                    className="myInput-AIChat"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    autoFocus
                />
                <button className="myBtn-AIChat" onClick={handleSendMessage} disabled={isLoading || !message.trim()}>
                    {isLoading ? "Sending..." : "Send"}
                </button>
            </div>
        </div>
    );
}

export default Chatbot;
=======

import React from 'react'

const SearchIa = () => {
    return (
        <div id="SearchIA">
            <div  id='searchIA'>
                Search By </div>
                <svg id='IA' width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.8303 2.32901L14.5976 0H15.9309L16.6981 2.32901L19 3.10535V4.45439L16.6981 5.23073L15.9309 7.55974H14.5976L13.8303 5.23073L11.5284 4.45439V3.10535L13.8303 2.32901Z" fill="#FFFCFF"/>
                    <path d="M16.4354 9.70492V18H14.093V9.70492H16.4354Z" fill="#FFFCFF"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.94734 2.59486H7.84201L11.7892 18H9.3694L8.45851 14.445H3.33075L2.41982 18H0L3.94734 2.59486ZM3.93803 12.0749H7.85124L6.02945 4.96488H5.75988L3.93803 12.0749Z" fill="#FFFCFF"/>
                </svg>


        </div>
    )
}
export default SearchIa
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
