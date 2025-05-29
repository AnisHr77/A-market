import { useState, useEffect, useRef } from 'react';
import './Chat.css';


function Chat() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    const currentUserId = 2; // المستخدم الحالي دائماً هو user_id = 2

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        loadUsers();
        const interval = setInterval(checkUnreadMessages, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (selectedUser) {
            loadMessages(selectedUser.user_id);
        }
    }, [selectedUser]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadUsers = async () => {
        try {
            // إنشاء توكن وهمي للمستخدم 2
            const mockToken = 'mock_token_for_user_2';
            const response = await fetch('http://localhost:3006/api/users', {
                headers: {
                    'Authorization': `Bearer ${mockToken}`
                }
            });
            const data = await response.json();
            // تصفية المستخدمين للحصول على المستخدم رقم 1 فقط
            const userOne = data.find(user => user.user_id === 1);
            if (userOne) {
                setUsers([userOne]);
                setSelectedUser(userOne); // تحديد المستخدم رقم 1 تلقائياً
            }
        } catch (error) {
            console.error('Error loading users:', error);
        }
    };

    const loadMessages = async (userId) => {
        try {
            // إنشاء توكن وهمي للمستخدم 2
            const mockToken = 'mock_token_for_user_2';
            const response = await fetch(`http://localhost:3006/api/messages/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${mockToken}`
                }
            });
            const data = await response.json();
            // تصفية الرسائل بين المستخدمين 1 و 2 فقط
            const filteredMessages = data.filter(msg =>
                (msg.sender_id === 1 && msg.receiver_id === 2) ||
                (msg.sender_id === 2 && msg.receiver_id === 1)
            );
            setMessages(filteredMessages);
            await markMessagesAsRead(userId);
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim() || !selectedUser) return;

        try {
            // إنشاء توكن وهمي للمستخدم 2
            const mockToken = 'mock_token_for_user_2';
            const response = await fetch('http://localhost:3006/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${mockToken}`
                },
                body: JSON.stringify({
                    receiver_id: 1, // دائماً نرسل إلى المستخدم رقم 1
                    message_text: newMessage
                })
            });

            if (response.ok) {
                setNewMessage('');
                await loadMessages(1); // إعادة تحميل الرسائل مع المستخدم رقم 1
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const markMessagesAsRead = async (userId) => {
        try {
            // إنشاء توكن وهمي للمستخدم 2
            const mockToken = 'mock_token_for_user_2';
            await fetch(`http://localhost:3006/api/mark-read/${userId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${mockToken}`
                }
            });
        } catch (error) {
            console.error('Error marking messages as read:', error);
        }
    };

    const checkUnreadMessages = async () => {
        try {
            // إنشاء توكن وهمي للمستخدم 2
            const mockToken = 'mock_token_for_user_2';
            const response = await fetch(`http://localhost:3006/api/unread-messages/1`, {
                headers: {
                    'Authorization': `Bearer ${mockToken}`
                }
            });
            const data = await response.json();
            const badge = document.getElementById('unread-1');
            if (data.count > 0) {
                badge.textContent = data.count;
                badge.style.display = 'inline';
            } else {
                badge.style.display = 'none';
            }
        } catch (error) {
            console.error('Error checking unread messages:', error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="chat-component">
            <div className="chat-container">
                <div className="users-list">
                    {users.map(user => (
                        <div
                            key={user.user_id}
                            className={`user-item ${selectedUser?.user_id === user.user_id ? 'active' : ''}`}
                            onClick={() => setSelectedUser(user)}
                        >
                            <div className="user-avatar">{user.full_name.charAt(0)}</div>
                            <div className="user-info">
                                <div className="user-name">{user.full_name}</div>
                                <div className="user-status">Online</div>
                            </div>
                            <span className="unread-badge" id="unread-1" style={{ display: 'none' }}>0</span>
                        </div>
                    ))}
                </div>
                <div className="chat-area">
                    <div className="chat-header">
                        <div className="user-info">
                            <div className="user-name">Select a user to start</div>
                        </div>
                    </div>
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message ${msg.sender_id === currentUserId ? 'sent' : 'received'}`}
                            >
                                <div className="message-content">{msg.message_text}</div>
                                <div className="message-time">
                                    {new Date(msg.sent_at).toLocaleTimeString()}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="message-input">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message here..."
                        />
                        <button onClick={sendMessage} aria-label="Send">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 20L21 12L3 4V10L17 12L3 14V20Z" fill="currentColor"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
