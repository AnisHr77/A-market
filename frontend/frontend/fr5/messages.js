const pool = require('./db');

// Function to send a message
async function sendMessage(senderId, receiverId, messageContent) {
    try {
        const [result] = await pool.query(
            'INSERT INTO messages (sender_id, receiver_id, message_content, sent_at) VALUES (?, ?, ?, NOW())',
            [senderId, receiverId, messageContent]
        );
        return result;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}

// Function to get all messages between two users
async function getMessagesBetweenUsers(user1Id, user2Id) {
    try {
        const [rows] = await pool.query(
            `SELECT m.*, 
                    s.full_name as sender_name, 
                    r.full_name as receiver_name 
             FROM messages m 
             JOIN users s ON m.sender_id = s.user_id 
             JOIN users r ON m.receiver_id = r.user_id 
             WHERE (m.sender_id = ? AND m.receiver_id = ?) 
             OR (m.sender_id = ? AND m.receiver_id = ?) 
             ORDER BY m.sent_at ASC`,
            [user1Id, user2Id, user2Id, user1Id]
        );
        return rows;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
}

// Function to display messages between two users
async function displayMessages(user1Id, user2Id) {
    try {
        const messages = await getMessagesBetweenUsers(user1Id, user2Id);
        console.log('\nMessages:');
        messages.forEach(msg => {
            console.log(`
From: ${msg.sender_name}
To: ${msg.receiver_name}
Message: ${msg.message_content}
Time: ${msg.sent_at}
----------------------------------------`);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Example usage
async function testMessageSystem() {
    try {
        // Send a message from admin (user_id: 1) to a user
        await sendMessage(1, 2, "Hello, how can I help you?");
        
        // Send a reply from user to admin
        await sendMessage(2, 1, "Thank you for your help!");
        
        // Display all messages between admin and user
        await displayMessages(1, 2);
    } catch (error) {
        console.error('Error in test:', error);
    }
}

// Execute the test
testMessageSystem(); 