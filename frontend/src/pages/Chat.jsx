import { useState, useEffect, useRef } from 'react';
import './Chat.css';

function Chat() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isConnected, setIsConnected] = useState(true);
    const messagesEndRef = useRef(null);
    const ADMIN_USER_ID = 1;
    const CURRENT_USER_ID = 88;
    const MOCK_TOKEN = "mock_token_for_user_88";

    // التحقق من اتصال الخادم
    const checkServerConnection = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/test');
            if (!response.ok) {
                throw new Error('Server connection failed');
            }
            setIsConnected(true);
            setError(null);
        } catch (error) {
            console.error('Server connection error:', error);
            setIsConnected(false);
            setError('فقد الاتصال بالخادم. يرجى تحديث الصفحة.');
        }
    };

    useEffect(() => {
        checkServerConnection();
        const interval = setInterval(checkServerConnection, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        console.log('Loading admin user...');
        loadAdminUser();
        const interval = setInterval(checkUnreadMessages, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (selectedUser) {
            console.log('Selected user changed, loading messages...');
            loadMessages(ADMIN_USER_ID);
        }
    }, [selectedUser]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // تحميل بيانات المستخدم Admin فقط
    const loadAdminUser = async () => {
        try {
            if (!isConnected) {
                throw new Error('No server connection');
            }

            console.log('Fetching admin user...');
            const response = await fetch(`http://localhost:4000/api/users/${ADMIN_USER_ID}`, {
                headers: {
                    'Authorization': `Bearer ${MOCK_TOKEN}`
                }
            });
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Admin user not found');
                }
                throw new Error(`Failed to fetch admin user: ${response.status}`);
            }
            
            const adminUser = await response.json();
            console.log('Admin user data:', adminUser);

            if (adminUser) {
                setUsers([adminUser]);
                setSelectedUser(adminUser);
                setIsLoading(false);
                // تحميل الرسائل مباشرة بعد تحميل بيانات المسؤول
                await loadMessages(ADMIN_USER_ID);
            }
        } catch (error) {
            console.error('Error loading admin user:', error);
            setError(error.message === 'No server connection' ? 
                'فقد الاتصال بالخادم. يرجى تحديث الصفحة.' : 
                'حدث خطأ في تحميل بيانات المسؤول');
            setIsLoading(false);
        }
    };

    const loadMessages = async (userId) => {
        try {
            if (!isConnected) {
                throw new Error('No server connection');
            }

            console.log('Loading messages between users:', CURRENT_USER_ID, 'and', ADMIN_USER_ID);
            const response = await fetch(`http://localhost:4000/api/messages/${ADMIN_USER_ID}`, {
                headers: {
                    'Authorization': `Bearer ${MOCK_TOKEN}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch messages: ${response.status}`);
            }

            const data = await response.json();
            console.log('Raw messages data:', data);
            
            const filteredMessages = data.filter(msg => {
                const isRelevantMessage = 
                    (msg.sender_id === ADMIN_USER_ID && msg.receiver_id === CURRENT_USER_ID) ||
                    (msg.sender_id === CURRENT_USER_ID && msg.receiver_id === ADMIN_USER_ID);
                
                console.log('Message:', msg, 'Is relevant:', isRelevantMessage);
                return isRelevantMessage;
            }).sort((a, b) => new Date(a.sent_at) - new Date(b.sent_at));

            console.log('Filtered messages:', filteredMessages);

            if (filteredMessages.length === 0) {
                console.log('No messages found between users');
                const welcomeMessage = {
                    message_id: Date.now(),
                    sender_id: ADMIN_USER_ID,
                    receiver_id: CURRENT_USER_ID,
                    message_text: "مرحباً بك في خدمة العملاء! كيف يمكنني مساعدتك اليوم؟",
                    sent_at: new Date().toISOString(),
                    is_read: 1
                };
                setMessages([welcomeMessage]);
            } else {
            setMessages(filteredMessages);
            }

            await markMessagesAsRead(ADMIN_USER_ID);
        } catch (error) {
            console.error('Error loading messages:', error);
            setError(error.message === 'No server connection' ? 
                'فقد الاتصال بالخادم. يرجى تحديث الصفحة.' : 
                'حدث خطأ في تحميل الرسائل');
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim() || !selectedUser) {
            console.log('Cannot send message:', { 
                hasMessage: !!newMessage.trim(), 
                hasSelectedUser: !!selectedUser
            });
            return;
        }

        if (!isConnected) {
            setError('فقد الاتصال بالخادم. يرجى تحديث الصفحة.');
            return;
        }

        try {
            console.log('Sending message:', newMessage);
            const response = await fetch('http://localhost:4000/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${MOCK_TOKEN}`
                },
                body: JSON.stringify({
                    receiver_id: ADMIN_USER_ID,
                    message_text: newMessage
                })
            });

            if (!response.ok) {
                throw new Error(`Failed to send message: ${response.status}`);
            }

            const result = await response.json();
            console.log('Message sent successfully:', result);
            
            const newMsg = {
                message_id: result.messageId,
                sender_id: CURRENT_USER_ID,
                receiver_id: ADMIN_USER_ID,
                message_text: newMessage,
                sent_at: new Date().toISOString(),
                is_read: 0
            };
            
            setMessages(prev => [...prev, newMsg]);
            setNewMessage('');
            setError(null);
            
            await loadMessages(ADMIN_USER_ID);
        } catch (error) {
            console.error('Error sending message:', error);
            setError('حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.');
        }
    };

    const markMessagesAsRead = async (userId) => {
        try {
            await fetch(`http://localhost:4000/api/mark-read/${userId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${MOCK_TOKEN}`
                }
            });
        } catch (error) {
            console.error('Error marking messages as read:', error);
        }
    };

    const checkUnreadMessages = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/unread-messages/${ADMIN_USER_ID}`, {
                headers: {
                    'Authorization': `Bearer ${MOCK_TOKEN}`
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
            {!isConnected && (
                <div className="connection-error">
                    {error}
                    <button onClick={checkServerConnection} className="retry-button">
                        إعادة المحاولة
                    </button>
                </div>
            )}
            {error && isConnected && (
                <div className="error-message">
                    {error}
                </div>
            )}
            {isLoading ? (
                <div className="loading-message">
                    جاري التحميل...
                </div>
            ) : (
            <div className="chat-container">
                <div className="users-list">
                    {users.map(user => (
                        <div
                            key={user.user_id}
                            className={`user-item ${selectedUser?.user_id === user.user_id ? 'active' : ''}`}
                            onClick={() => setSelectedUser(user)}
                        >
                                <div className="user-avatar">
                                    <img 
                                        src={user.profile_image} 
                                        alt={user.full_name}
                                        onError={(e) => {
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name)}&background=random`;
                                        }}
                                    />
                                </div>
                            <div className="user-info">
                                <div className="user-name">{user.full_name}</div>
                                    <div className="user-status">{user.type === 'admin' ? 'Admin' : 'Online'}</div>
                            </div>
                            <span className="unread-badge" id="unread-1" style={{ display: 'none' }}>0</span>
                        </div>
                    ))}
                </div>
                <div className="chat-area">
                    <div className="chat-header">
                        <div className="user-info">
                                <div className="user-name">
                                    {selectedUser ? `${selectedUser.full_name} (Admin)` : 'Select a user to start'}
                                </div>
                        </div>
                    </div>
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                    className={`message ${msg.sender_id === CURRENT_USER_ID ? 'sent' : 'received'}`}
                            >
                                <div className="message-content">{msg.message_text}</div>
                                <div className="message-time">
                                        {new Date(msg.sent_at).toLocaleTimeString('ar-SA', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        })}
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
                                placeholder="اكتب رسالتك هنا..."
                                dir="rtl"
                        />
                        <button onClick={sendMessage} aria-label="Send">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 20L21 12L3 4V10L17 12L3 14V20Z" fill="currentColor"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}

export default Chat;
