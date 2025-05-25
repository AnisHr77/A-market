import { useState, useRef, useEffect } from "react";
import "./Chat.css";
import paperclip from './paperclip.png';
import defaultProfile from './defaultProfile.png';

function Chat() {
    const fileInputRef = useRef(null);
    const profileInputRef = useRef(null);

    const [message, setMessage] = useState('');
    const [activeChat, setActiveChat] = useState('Scouting Group');
    const [profilePic, setProfilePic] = useState(defaultProfile);

    // Helper to load messages from localStorage with date parsing
    const loadMessages = () => {
        const saved = localStorage.getItem('chatMessages');
        if (!saved) {
            return {
                'Scouting Group': [],
                'lafdel walid': []
            };
        }
        const parsed = JSON.parse(saved);
        Object.keys(parsed).forEach(chat => {
            parsed[chat] = parsed[chat].map(msg => ({
                ...msg,
                timestamp: new Date(msg.timestamp)
            }));
        });
        return parsed;
    };

    const [messages, setMessages] = useState(loadMessages);

    // Save messages to localStorage on change
    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    const handleSendMessage = () => {
        if (!message.trim()) return;

        const newMessage = {
            text: message,
            sender: 'You',
            timestamp: new Date()
        };

        setMessages(prev => ({
            ...prev,
            [activeChat]: [...prev[activeChat], newMessage]
        }));

        setMessage('');
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.match('image.*')) {
            alert('Please select an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const newMessage = {
                text: message,
                image: reader.result,
                sender: 'You',
                timestamp: new Date()
            };

            setMessages(prev => ({
                ...prev,
                [activeChat]: [...prev[activeChat], newMessage]
            }));

            setMessage('');
        };
        reader.readAsDataURL(file);
    };

    const handleProfileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.match('image.*')) {
            alert('Please select an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setProfilePic(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="chat-app">
            <div className="chat-header">
                <h1 className={'bolding'}>Messaging</h1>
                <div className="profile-pic-container">
                    <img
                        src={profilePic}
                        alt="Profile"
                        className="profile-pic"
                        onClick={() => profileInputRef.current.click()}
                    />
                    <input
                        type="file"
                        ref={profileInputRef}
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={handleProfileUpload}
                    />
                </div>
            </div>

            <div className="chat-container">
                <div className="chat-list">
                    <div className="chat-list-header">
                        <h2 className={'boldingg'}>Chats</h2>
                        <div className="chat-tabs">
                            <button>Open</button>
                        </div>
                    </div>

                    <div
                        className={`chat-list-item ${activeChat === 'lafdel walid' ? 'active' : ''}`}
                        onClick={() => setActiveChat('lafdel walid')}
                    >
                        <div className="chat-preview">
                            <h3 className={'texting'}>lafdel walid</h3>
                            <p className={'small'}>You: UK Consulting</p>
                        </div>
                        <span className="chat-time">12m</span>
                    </div>

                    <div
                        className={`chat-list-item ${activeChat === 'Scouting Group' ? 'active' : ''}`}
                        onClick={() => setActiveChat('Scouting Group')}
                    >
                        <div className="chat-preview">
                            <h3 className={'texting'}>Scouting Group</h3>
                            <p className={'small'}>Welcome to the Streamline scouting chat</p>
                        </div>
                    </div>
                </div>

                <div className="chat-area">
                    <div className="chat-messages">
                        <h2 className={'boldingg'}>{activeChat}</h2>

                        {activeChat === 'Scouting Group' && (
                            <div className="message-date">Tuesday, April 7th at 1:21 PM</div>
                        )}

                        {messages[activeChat].map((msg, index) => (
                            <div
                                key={index}
                                className={`message ${msg.sender === 'You' ? 'sent' : 'received'} ${msg.image ? 'image-message' : ''}`}
                            >
                                {msg.sender !== 'You' && msg.sender !== 'System' && (
                                    <span className="sender-name">{msg.sender}</span>
                                )}

                                {msg.image && (
                                    <div className="message-image">
                                        <img src={msg.image} alt="Uploaded content" />
                                    </div>
                                )}

                                {msg.isLink ? (
                                    <a href="#" className="message-link">{msg.text}</a>
                                ) : (
                                    msg.text && <p>{msg.text}</p>
                                )}

                                <span className="message-time">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="message-input">
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                        <button onClick={handleUploadClick} className="attach-button" style={{ cursor: 'default' }}>
                            <img
                                src={paperclip}
                                alt="Attach file"
                                className="paperclip-icon"
                                style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                            />
                        </button>
                        <input
                            type="text"
                            placeholder="Write a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button className="send" onClick={handleSendMessage}>Send</button>
                    </div>
                </div>

                <div className="chat-info">
                    <h2 className={'boldingg'}>Shared Files</h2>
                    <h2 className={'boldingg'}>Shared Links</h2>

                    <div className="customize-chat">
                        <h3 className={'texting'}>Customize Chat</h3>
                        <p className={'small'}>Change layout and colors</p>
                    </div>

                    <div className="privacy-support">
                        <h3 className={'texting'}>Privacy and Support</h3>
                        <p className={'small'}>Get immediate advice</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
