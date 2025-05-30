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
            body: JSON.stringify({ contents: transformedChatHistory }),
        };

        try {
            const response = await fetch(process.env.REACT_APP_API_URL, requestOptions);
            const responseText = await response.text();

            if (!response.ok) {
                let errorDetails = `API request failed with status ${response.status}`;
                try {
                    const errorData = JSON.parse(responseText);
                    errorDetails = errorData?.error?.message || errorData?.message || errorDetails;
                    console.error("API Error Details:", errorData);
                } catch (e) {
                    errorDetails = `API request failed with status ${response.status}. Response body: ${responseText.substring(0, 200)}`;
                    console.error("API Error (non-JSON response):", responseText);
                }
                throw new Error(errorDetails);
            }

            const data = JSON.parse(responseText);
            const botText = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!botText) {
                console.warn("API response had no generated text candidates. Full response:", JSON.stringify(data, null, 2));
                const safetyRatings = data.promptFeedback?.safetyRatings;
                if (safetyRatings && safetyRatings.length > 0) {
                    const blockedReason = safetyRatings.map(r => `${r.category}: ${r.probability}`).join(', ');
                    throw new Error(`Content blocked by safety filters. Details: ${blockedReason}`);
                }
                throw new Error("API returned no valid response candidates or text.");
            }
            return botText;
        } catch (error) {
            console.error("Error calling generateBotResponse:", error);
            throw error;
        }
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
                            <div className="message-text">{msg.text}</div>
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
