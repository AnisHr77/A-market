import { useState,useRef } from "react";
import "./Chat.css";
import paperclip from './paperclip.png'
import defaultProfile from './defaultProfile.png'; 

function Chat() {
  const [message, setMessage] = useState('');
  const [activeChat, setActiveChat] = useState('Scouting Group');
  const fileInputRef = useRef(null);

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
        text: message, // Include the typed text (if any)
        image: reader.result, // Include the image
        sender: 'You',
        timestamp: new Date()
      };
      
      setMessages(prev => ({
        ...prev,
        [activeChat]: [...prev[activeChat], newMessage]
      }));
      
      setMessage(''); // Clear input after upload
    };
    reader.readAsDataURL(file);
  };

  const [messages, setMessages] = useState({
    'Scouting Group':[],
    'lafdel walid': []
  });

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      text: message,
      sender: 'You',
      timestamp: new Date() // digital record of the exact time at which an event occurs
    };
    
    setMessages(prev => ({
      ...prev,
      [activeChat]: [...prev[activeChat], newMessage]
    }));
    
    setMessage("");
  };

  

  const profileInputRef = useRef(null);
  const [profilePic, setProfilePic] = useState(defaultProfile); // State for profile picture

  // Add this function to handle profile picture upload
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

  // ... (keep all your existing code)

  return (
    <div className="chat-app">
      {/* Modified Header with Profile Picture */}
      <div className="chat-header">
      <h1>Messaging</h1>
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
        {/* Left sidebar - Chat list */}
        <div className="chat-list">
          <div className="chat-list-header">
            <h2>Chats</h2>
            <div className="chat-tabs">
              <button>Open</button>
              <button>Unread</button>
            </div>
          </div>

          <div 
            className={`chat-list-item ${activeChat === 'lafdel walid' ? 'active' : ''}`}
            onClick={() => setActiveChat('lafdel walid')}
          >
            <div className="chat-preview">
              <h3>lafdel walid</h3>
              <p>You: UK Consulting</p>
            </div>
            <span className="chat-time">12m</span>
          </div>

          <div 
            className={`chat-list-item ${activeChat === 'Scouting Group' ? 'active' : ''}`}
            onClick={() => setActiveChat('Scouting Group')}
          >
            <div className="chat-preview">
              <h3>Scouting Group</h3>
              <p>Welcome to the Streamline scouting chat</p>
            </div>
          </div>
        </div>

        {/* Main chat area */}
        <div className="chat-area">
        <div className="chat-messages">
  <h2>{activeChat}</h2>
  
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
      
      {/* Add this image display block */}
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

        {/* Right sidebar - Chat info */}
        <div className="chat-info">
          <h2>Shared Files</h2>
          <h2>Shared Links</h2>
        

          <div className="customize-chat">
            <h3>Customize Chat</h3>
            <p>Change layout and colors</p>
          </div>

          <div className="privacy-support">
            <h3>Privacy and Support</h3>
            <p>Get immediate advice</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;