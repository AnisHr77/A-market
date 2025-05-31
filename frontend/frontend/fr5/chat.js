document.addEventListener('DOMContentLoaded', function() {
    const API_BASE_URL = 'http://localhost:3004';
    const usersList = document.getElementById('usersList');
    const messagesContainer = document.getElementById('messagesContainer');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendMessage');
    const searchInput = document.getElementById('searchUser');
    const selectedUserImage = document.getElementById('selectedUserImage');
    const selectedUserName = document.getElementById('selectedUserName');
    const selectedUserStatus = document.getElementById('selectedUserStatus');

    let selectedUserId = null;
    let currentUser = null;

    // Check if user is admin
    function checkAdminAuth() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.type !== 'admin') {
            window.location.href = '/login.html';
            return;
        }
        currentUser = user;
    }

    // Fetch users
    function fetchUsers() {
        fetch(`${API_BASE_URL}/api/users`)
            .then(response => response.json())
            .then(users => {
                displayUsers(users);
            })
            .catch(error => console.error('Error fetching users:', error));
    }

    // Function to get unread messages count
    function getUnreadMessagesCount(userId) {
        return fetch(`${API_BASE_URL}/api/unread-messages/${userId}`)
            .then(response => response.json())
            .then(data => data.count)
            .catch(error => {
                console.error('Error getting unread messages count:', error);
                return 0;
            });
    }

    // Function to update unread badge
    async function updateUnreadBadge(userId, userElement) {
        const count = await getUnreadMessagesCount(userId);
        let badge = userElement.querySelector('.unread-badge');
        
        if (count > 0) {
            if (!badge) {
                badge = document.createElement('div');
                badge.className = 'unread-badge';
                userElement.appendChild(badge);
            }
            badge.textContent = count;
        } else if (badge) {
            badge.remove();
        }
    }

    // Display users in the list
    async function displayUsers(users) {
        usersList.innerHTML = '';
        for (const user of users) {
            if (user.type === 'user') {
                const userElement = document.createElement('div');
                userElement.className = 'user-item';
                userElement.innerHTML = `
                    <img src="${user.profile_image || 'default-avatar.png'}" alt="${user.full_name}">
                    <div class="user-info">
                        <div class="user-name">${user.full_name}</div>
                        <div class="user-status">Offline</div>
                    </div>
                `;
                userElement.addEventListener('click', () => selectUser(user));
                usersList.appendChild(userElement);
                
                // Add unread messages badge
                await updateUnreadBadge(user.user_id, userElement);
            }
        }
    }

    // Select a user to chat with
    function selectUser(user) {
        selectedUserId = user.user_id;
        selectedUserImage.src = user.profile_image || 'default-avatar.png';
        selectedUserName.textContent = user.full_name;
        
        // Update active state in users list
        document.querySelectorAll('.user-item').forEach(item => {
            item.classList.remove('active');
            if (item.querySelector('.user-name').textContent === user.full_name) {
                item.classList.add('active');
                // Remove unread badge when user is selected
                const badge = item.querySelector('.unread-badge');
                if (badge) badge.remove();
            }
        });

        // Load messages
        loadMessages(user.user_id);
    }

    // Load messages for selected user
    function loadMessages(userId) {
        fetch(`${API_BASE_URL}/api/messages/${userId}?currentUserId=${currentUser.user_id}`)
            .then(response => response.json())
            .then(messages => {
                displayMessages(messages);
                markMessagesAsRead(userId);
            })
            .catch(error => console.error('Error loading messages:', error));
    }

    // Display messages in the chat area
    function displayMessages(messages) {
        messagesContainer.innerHTML = '';
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = `message ${message.sender_id === currentUser.user_id ? 'sent' : 'received'}`;
            messageElement.innerHTML = `
                <div class="message-content">${message.message_text}</div>
                <div class="message-time">${formatTime(message.sent_at)}</div>
            `;
            messagesContainer.appendChild(messageElement);
        });
        scrollToBottom();
    }

    // Send message
    function sendMessage() {
        const message = messageInput.value.trim();
        if (!message || !selectedUserId) return;

        fetch(`${API_BASE_URL}/api/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                receiver_id: selectedUserId,
                message_text: message
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                messageInput.value = '';
                loadMessages(selectedUserId);
            }
        })
        .catch(error => console.error('Error sending message:', error));
    }

    // Search users
    function searchUsers(query) {
        const userItems = document.querySelectorAll('.user-item');
        userItems.forEach(item => {
            const userName = item.querySelector('.user-name').textContent.toLowerCase();
            if (userName.includes(query.toLowerCase())) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Format time
    function formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Scroll to bottom of messages
    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Add function to mark messages as read
    function markMessagesAsRead(userId) {
        fetch(`${API_BASE_URL}/api/mark-read/${userId}`, {
            method: 'POST'
        }).catch(error => console.error('Error marking messages as read:', error));
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    searchInput.addEventListener('input', (e) => {
        searchUsers(e.target.value);
    });

    // Initialize
    checkAdminAuth();
    fetchUsers();

    // Poll for new messages every 5 seconds
    setInterval(() => {
        if (selectedUserId) {
            loadMessages(selectedUserId);
        }
    }, 5000);

    // Add periodic check for unread messages
    setInterval(async () => {
        const userItems = document.querySelectorAll('.user-item');
        for (const item of userItems) {
            const userId = item.getAttribute('data-user-id');
            if (userId && userId !== selectedUserId) {
                await updateUnreadBadge(userId, item);
            }
        }
    }, 10000); // Check every 10 seconds
}); 