const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');
const multer = require('multer');
const db = require('./db');

const app = express();
const PORT = 3006;

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../frontend/fr7/uploads/'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a valid image'));
        }
        cb(null, true);
    }
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = path.join(__dirname, '../../frontend/fr7/uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../../frontend/frontend/fr7')));
app.use('/uploads', express.static(path.join(__dirname, '../../../frontend/frontend/fr7/uploads')));

// Middleware to check authentication
const checkAuth = (req, res, next) => {
    if (req.path === '/login.html' || req.path.startsWith('/api') || req.path === '/') {
        return next();
    }
    if (req.path === '/index.html' && !req.headers.authorization) {
        return res.redirect('/login.html');
    }
    next();
};
app.use(checkAuth);

// API Routes
app.post('/api/register', upload.single('profileImage'), async (req, res) => {
    const { username, email, password, age, wilaya, commune, gender, phoneNumber, userType } = req.body;
    
    try {
        // Check if email exists
        const [existingUsers] = await db.query('SELECT * FROM users WHERE gmail = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Image path
        const profileImagePath = req.file ? '/uploads/' + req.file.filename : null;

        // Create new user
        const [result] = await db.query(
            'INSERT INTO users (full_name, gmail, user_password, phone_number, age, wilaya, commune, gender, profile_image, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [username, email, hashedPassword, phoneNumber, age, wilaya, commune, gender, profileImagePath, userType]
        );

        res.status(201).json({ 
            success: true,
            message: 'Registration successful',
            user: {
                id: result.insertId,
                name: username,
                email,
                phoneNumber,
                age,
                wilaya,
                commune,
                gender,
                type: userType,
                profileImage: profileImagePath
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error during registration'
        });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const [users] = await db.query('SELECT * FROM users WHERE gmail = ?', [email]);
        const user = users[0];

        if (!user || !(await bcrypt.compare(password, user.user_password))) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid email or password' 
            });
        }

        const { user_password, ...userWithoutPassword } = user;
        res.json({
            success: true,
            message: 'Login successful',
            ...userWithoutPassword
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error during login' 
        });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const [users] = await db.query('SELECT user_id, full_name, gmail, phone_number, age, wilaya, commune, gender, profile_image, registration_date, type FROM users');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        const [user] = await db.query('SELECT profile_image FROM users WHERE user_id = ?', [req.params.id]);
        if (user[0] && user[0].profile_image) {
            const imagePath = path.join(__dirname, user[0].profile_image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await db.query('DELETE FROM users WHERE user_id = ?', [req.params.id]);
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ success: false, message: 'Error deleting user' });
    }
});

app.put('/api/users/:id/type', async (req, res) => {
    try {
        const { type } = req.body;
        const userId = req.params.id;

        if (!['user', 'admin'].includes(type)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid user type' 
            });
        }

        await db.query('UPDATE users SET type = ? WHERE user_id = ?', [type, userId]);
        
        res.json({ 
            success: true, 
            message: 'User type updated successfully' 
        });
    } catch (error) {
        console.error('Error updating user type:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error updating user type' 
        });
    }
});

// Routes
app.get('/', (req, res) => res.redirect('/login.html'));
app.get('/index.html', (req, res) => res.sendFile(path.join(__dirname, '../../../frontend/frontend/fr7/index.html')));
app.get('/login.html', (req, res) => res.sendFile(path.join(__dirname, '../../../frontend/frontend/fr7/login.html')));
app.get('/auth.html', (req, res) => res.sendFile(path.join(__dirname, '../../../frontend/frontend/fr7/auth.html')));
app.get('/users.html', (req, res) => res.sendFile(path.join(__dirname, '../../../frontend/frontend/fr7/users.html')));

app.listen(PORT, () => {
    console.log('\n🚀 Server is running!');
    console.log('\n📱 Access the application at:');
    console.log(`   http://localhost:${PORT}`);
    console.log('\n✨ Happy coding!\n');
});