const pool = require('./db');

// Middleware to check if user is logged in
async function checkAuth(req, res, next) {
    try {
        // Check if user session exists
        if (!req.session || !req.session.userId) {
            return res.redirect('/login.html');
        }

        // Verify user exists in database
        const [users] = await pool.query(
            'SELECT user_id, type FROM users WHERE user_id = ?',
            [req.session.userId]
        );

        if (users.length === 0) {
            // Clear invalid session
            req.session.destroy();
            return res.redirect('/login.html');
        }

        // Add user info to request
        req.user = users[0];
        next();
    } catch (error) {
        console.error('Auth error:', error);
        res.redirect('/login.html');
    }
}

// Middleware to check if user is admin
function checkAdmin(req, res, next) {
    if (!req.user || req.user.type !== 'admin') {
        return res.redirect('/login.html');
    }
    next();
}

module.exports = {
    checkAuth,
    checkAdmin
}; 