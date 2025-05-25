const pool = require('./db');

// Default color gradients for male and female users
const DEFAULT_AVATARS = {
    male: 'linear-gradient(135deg, #1e88e5 0%, #0d47a1 100%)',
    female: 'linear-gradient(135deg, #ec407a 0%, #c2185b 100%)'
};

async function getAllUsers() {
    try {
        const [rows] = await pool.query(
            'SELECT user_id, full_name, gmail, phone_number, age, wilaya, commune, gender, profile_image, registration_date FROM users WHERE type = ?',
            ['user']
        );
        return rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

// Function to get the appropriate background
function getAvatarUrl(user) {
    if (user.profile_image && user.profile_image.trim() !== '') {
        return user.profile_image;
    }
    return DEFAULT_AVATARS[user.gender] || DEFAULT_AVATARS.male;
}

// Example usage
async function displayUsers() {
    try {
        const users = await getAllUsers();
        console.log('All Users:');
        users.forEach(user => {
            console.log(`
User ID: ${user.user_id}
Name: ${user.full_name}
Email: ${user.gmail}
Phone: ${user.phone_number}
Age: ${user.age}
Location: ${user.wilaya}, ${user.commune}
Gender: ${user.gender}
Background: ${getAvatarUrl(user)}
Registration Date: ${user.registration_date}
----------------------------------------`);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Execute the function
displayUsers(); 