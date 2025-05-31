document.addEventListener('DOMContentLoaded', function() {
    const usersList = document.getElementById('users-list');
    
    //جلب المستخدمين و عرضهم باستعمال default get
    function fetchUsers() {
        fetch('/api/users')
            .then(response => response.json())
            .then(users => { 
                console.log('Users data:', users); // للتأكد من البيانات المستلمة
                displayUsers(users);
            })
            .catch(error => console.error('Error fetching users:', error));
    }

    // لعرض المستخدمين في ال tbody
    function displayUsers(users) {
        usersList.innerHTML = '';
        
        users.forEach(user => {
            const row = document.createElement('tr');
            const userType = user.type || 'user'; // Default to 'user' if type is undefined
            
            row.innerHTML = `
                <td>${user.user_id || ''}</td>
                <td>
                    <div class="user-info">
                        ${user.profile_image ? 
                            `<img src="${user.profile_image}" alt="User Avatar" class="user-avatar">` : 
                            '<div class="no-avatar">No Image</div>'}
                        <span>${user.full_name || ''}</span>
                    </div>
                </td>
                <td>${user.gmail || ''}</td>
                <td>${user.phone_number || ''}</td>
                <td>${user.age || ''}</td>
                <td>${user.wilaya || ''}</td>
                <td>${user.commune || ''}</td>
                <td>${user.gender || ''}</td>
                <td>
                    <button class="type-toggle ${userType}" data-id="${user.user_id}" data-type="${userType}">
                        ${userType === 'admin' ? 
                            '<i class="fas fa-user-shield"></i> Admin' : 
                            '<i class="fas fa-user"></i> User'}
                    </button>
                </td>
                <td>${formatDate(user.registration_date) || ''}</td>
                <td>
                    <button class="btn btn-delete" data-id="${user.user_id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            `;
            
            usersList.appendChild(row);
        });
        
        // Add click event listeners for type toggle buttons
        document.querySelectorAll('.type-toggle').forEach(button => {
            button.addEventListener('click', toggleUserType);
        });
        
        document.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', deleteUser);
        });
    }
    
    // تنسيق التاريخ
    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString('en-US');
    }
    
    // حذف المستخدم
    function deleteUser(event) {
        const userId = event.target.closest('.btn-delete').getAttribute('data-id');
        
        if (confirm('Are you sure you want to delete this user?')) {
            fetch(`/api/users/${userId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchUsers();
                }
            })
            .catch(error => console.error('Error deleting user:', error));
        }
    }

    function toggleUserType(event) {
        const button = event.target;
        const userId = button.getAttribute('data-id');
        const currentType = button.getAttribute('data-type') || 'user';
        const newType = currentType === 'admin' ? 'user' : 'admin';

        // Create custom confirmation alert
        const overlay = document.createElement('div');
        overlay.className = 'custom-alert-overlay';

        const alertBox = document.createElement('div');
        alertBox.className = 'custom-alert';
        alertBox.innerHTML = `
            <div class="custom-alert-title">Confirm User Type Change</div>
            <div class="custom-alert-message">Are you sure you want to change the user type from "${currentType}" to "${newType}"?</div>
            <div class="custom-alert-buttons">
                <button class="custom-alert-button confirm">
                    <i class="fas fa-check"></i> Confirm
                </button>
                <button class="custom-alert-button cancel">
                    <i class="fas fa-times"></i> Cancel
                </button>
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(alertBox);

        // Add event listeners for buttons
        const confirmButton = alertBox.querySelector('.confirm');
        const cancelButton = alertBox.querySelector('.cancel');

        confirmButton.onclick = () => {
            fetch(`/api/users/${userId}/type`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type: newType })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = `
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="success-title">User type changed successfully</div>
                    `;
                    document.body.appendChild(successMessage);
                    setTimeout(() => {
                        successMessage.remove();
                        fetchUsers();
                    }, 2000);
                } else {
                    alert('Error updating user type');
                }
            })
            .catch(error => {
                console.error('Error updating user type:', error);
                alert('Error updating user type');
            })
            .finally(() => {
                overlay.remove();
                alertBox.remove();
            });
        };

        cancelButton.onclick = () => {
            overlay.remove();
            alertBox.remove();
        };

        // Close window when clicking outside
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                overlay.remove();
                alertBox.remove();
            }
        };
    }
    
    fetchUsers();
});