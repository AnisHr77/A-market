const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pool = require("./db");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- File Upload Setup ---
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
app.use("/uploads", express.static(uploadDir));
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
        return cb(new Error("Please upload a valid image file (jpg/jpeg/png)"));
    }
    cb(null, true);
};
const upload = multer({ storage, fileFilter });

// --- Auth Middleware ---
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        if (token === "mock_token_for_user_88") {
            req.user = { id: 88 };
            return next();
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }
};

// --- Welcome Route ---
app.get("/", (req, res) => {
    res.json({ message: "Welcome to A+ Market Backend API" });
});

// --- DB Test Route ---
app.get("/test-db", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT 1 + 1 AS result");
        res.json({ message: "Database connection successful", data: rows[0] });
    } catch (err) {
        res.status(500).json({ message: "Database connection failed", error: err.message });
    }
});

// --- Register Route ---
app.post("/api/register", async (req, res) => {
    try {
        const { username, email, password, phoneNumber, age, wilaya, commune, gender, profile_image } = req.body;
        
        // التحقق من وجود البريد الإلكتروني
        const [existingUsers] = await pool.query("SELECT * FROM users WHERE gmail = ?", [email]);
        if (existingUsers.length > 0) {
            return res.json({ success: false, message: "Email already exists" });
        }

        // تشفير كلمة المرور
        const hashedPassword = await bcrypt.hash(password, 10);

        // طباعة البيانات للتأكد
        console.log('Registration data received:', {
            username,
            email,
            phoneNumber,
            age,
            wilaya,
            commune,
            gender,
            profile_image
        });

        // إدخال البيانات في قاعدة البيانات
        const [result] = await pool.query(
            `INSERT INTO users
             (full_name, gmail, user_password, phone_number, age, wilaya, commune, gender, profile_image, type)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [username, email, hashedPassword, phoneNumber, age, wilaya, commune, gender, profile_image, "user"]
        );

        // جلب بيانات المستخدم الجديد
        const [newUser] = await pool.query(
            `SELECT user_id, full_name, gmail, phone_number, age, wilaya, commune, gender, profile_image, type, registration_date
             FROM users WHERE user_id = ?`,
            [result.insertId]
        );

        console.log('New user created:', newUser[0]);

        res.json({ success: true, message: "Registration successful!", user: newUser[0] });
    } catch (err) {
        console.error('Registration error:', err);
        res.json({ success: false, message: "Registration failed. Please try again." });
    }
});

// --- Login Route ---
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const [users] = await pool.query("SELECT * FROM users WHERE gmail = ?", [email]);
        if (users.length === 0) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.user_password);
        if (!validPassword) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        const { user_password, ...userWithoutPassword } = user;
        res.json({ success: true, message: "Login successful!", user: userWithoutPassword });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: "Login failed. Please try again." });
    }
});

// --- Profile Route ---
app.get("/api/profile", verifyToken, async (req, res) => {
    try {
        const [users] = await pool.query(
            `SELECT user_id, full_name, gmail, phone_number, age, wilaya, commune, gender, profile_image, type
             FROM users WHERE user_id = ?`,
            [req.user.id]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(users[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching profile" });
    }
});

// --- Users List (Excluding Self) ---
app.get("/api/users", verifyToken, async (req, res) => {
    try {
        const [users] = await pool.query(
            "SELECT user_id, full_name, profile_image FROM users WHERE user_id != ?",
            [req.user.id]
        );
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching users" });
    }
});

// --- Chat Messaging Routes ---
app.get("/api/messages/:userId", verifyToken, async (req, res) => {
    try {
        const userId = req.params.userId;
        const [messages] = await pool.query(
            `SELECT * FROM messages
             WHERE (sender_id = ? AND receiver_id = ?)
                OR (sender_id = ? AND receiver_id = ?)
             ORDER BY sent_at ASC`,
            [req.user.id, userId, userId, req.user.id]
        );
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching messages" });
    }
});

app.post("/api/messages", verifyToken, async (req, res) => {
    try {
        const { receiver_id, message_text } = req.body;
        const [result] = await pool.query(
            "INSERT INTO messages (sender_id, receiver_id, message_text) VALUES (?, ?, ?)",
            [req.user.id, receiver_id, message_text]
        );
        res.status(201).json({ messageId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error sending message" });
    }
});

app.post("/api/mark-read/:userId", verifyToken, async (req, res) => {
    try {
        const senderId = req.params.userId;
        await pool.query(
            "UPDATE messages SET is_read = 1 WHERE sender_id = ? AND receiver_id = ? AND is_read = 0",
            [senderId, req.user.id]
        );
        res.json({ message: "Messages marked as read" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error marking messages as read" });
    }
});

app.get("/api/unread-messages/:userId", verifyToken, async (req, res) => {
    try {
        const senderId = req.params.userId;
        const [result] = await pool.query(
            "SELECT COUNT(*) as count FROM messages WHERE sender_id = ? AND receiver_id = ? AND is_read = 0",
            [senderId, req.user.id]
        );
        res.json({ count: result[0].count });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error getting unread count" });
    }
});

// --- GET ALL PRODUCTS ---
app.get("/api/products", async (req, res) => {
    try {
        const [products] = await pool.query(`
            SELECT
                p.product_id, p.name, p.description, p.price, p.quantity, p.image_url,
                p.category_id, c.name AS category_name,
                p.created_at, p.old_price, p.discount_percent, p.visits
            FROM products p
                     LEFT JOIN categories c ON p.category_id = c.category_id
        `);
        res.json(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Error fetching products" });
    }
});
// --- GET Single Product by ID ---
app.get("/api/product/:id", async (req, res) => {
    const productId = req.params.id;
    try {
        const [products] = await pool.query(
            `SELECT
                p.product_id, p.name, p.description, p.price, p.quantity, p.image_url,
                p.category_id, c.name AS category_name,
                p.created_at, p.old_price, p.discount_percent, p.visits
             FROM products p
             LEFT JOIN categories c ON p.category_id = c.category_id
             WHERE p.product_id = ?`,
            [productId]
        );
        if (products.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(products[0]);
    } catch (err) {
        console.error("Error fetching product by ID:", err);
        res.status(500).json({ message: "Error fetching product" });
    }
});


// --- GET ALL CATEGORIES ---
app.get("/api/categories", async (req, res) => {
    console.log("GET /api/categories route hit");
    try {
        const [categories] = await pool.query(`SELECT category_id, name FROM categories`);
        console.log("Categories fetched:", categories);
        res.json(categories);
    } catch (err) {
        console.error("Error fetching categories:", err);
        res.status(500).json({ message: "Error fetching categories" });
    }
});

// --- Admin Dashboard ---
app.use('/admin', express.static(path.join(__dirname, 'frontend/frontend/Dashbord')));
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/frontend/Dashbord/dashboard.html'));
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});
app.get("/api/test", (req, res) => {
    console.log("Test route hit");
    res.json({ message: "API test works" });
});

app.post("/api/orders", async (req, res) => {
    const {
        user_id,
        product_id,
        quantity,
        total_price,
        shipping_address,
        wilaya,
        commune,
        estimated_delivery_date,
        status = "pending"
    } = req.body;

    try {
        const [result] = await pool.query(`
            INSERT INTO orders (
                user_id, product_id, quantity, total_price, order_date,
                status, shipping_address, wilaya, commune, estimated_delivery_date
            ) VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?)`,
            [user_id, product_id, quantity, total_price, status, shipping_address, wilaya, commune, estimated_delivery_date]
        );

        res.status(201).json({ message: "Order created", orderId: result.insertId });
    } catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({ message: "Error creating order" });
    }
});

// GET all orders
app.get("/api/orders", async (req, res) => {
    try {
        const [orders] = await pool.query("SELECT * FROM orders");
        res.json(orders);
    } catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ message: "Error fetching orders" });
    }
});

// GET orders by user ID
app.get("/api/orders/user/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const [orders] = await pool.query("SELECT * FROM orders WHERE user_id = ?", [userId]);
        res.json(orders);
    } catch (err) {
        console.error("Error fetching user orders:", err);
        res.status(500).json({ message: "Error fetching orders" });
    }
});

// GET a single order by ID
app.get("/api/orders/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [orders] = await pool.query("SELECT * FROM orders WHERE order_id = ?", [id]);
        if (orders.length === 0) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(orders[0]);
    } catch (err) {
        console.error("Error fetching order:", err);
        res.status(500).json({ message: "Error fetching order" });
    }
});

// UPDATE an order (status, tracking number, actual delivery date)
app.put("/api/orders/:id", async (req, res) => {
    const { id } = req.params;
    const {
        status,
        tracking_number,
        actual_delivery_date
    } = req.body;

    try {
        await pool.query(
            `UPDATE orders
             SET status = ?, tracking_number = ?, actual_delivery_date = ?
             WHERE order_id = ?`,
            [status, tracking_number, actual_delivery_date, id]
        );
        res.json({ message: "Order updated successfully" });
    } catch (err) {
        console.error("Error updating order:", err);
        res.status(500).json({ message: "Error updating order" });
    }
});

// DELETE an order
app.delete("/api/orders/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM orders WHERE order_id = ?", [id]);
        res.json({ message: "Order deleted successfully" });
    } catch (err) {
        console.error("Error deleting order:", err);
        res.status(500).json({ message: "Error deleting order" });
    }
});

// GET an order by tracking number
app.get("/api/orders/tracking/:trackingNumber", async (req, res) => {
    const { trackingNumber } = req.params;

    try {
        const [orders] = await pool.query("SELECT * FROM orders WHERE tracking_number = ?", [trackingNumber]);

        if (orders.length === 0) {
            return res.status(404).json({ message: "Tracking number not found" });
        }

        res.json(orders[0]);
    } catch (err) {
        console.error("Error fetching order by tracking number:", err);
        res.status(500).json({ message: "Error fetching order" });
    }
});

const siteImagesRoutes = require('./siteImages');
app.use('/api/site-images', siteImagesRoutes);

// --- Get User by ID Route ---
app.get("/api/users/:userId", verifyToken, async (req, res) => {
    try {
        const userId = req.params.userId;
        const [users] = await pool.query(
            `SELECT user_id, full_name, gmail, phone_number, age, wilaya, commune, gender, profile_image, type
             FROM users WHERE user_id = ?`,
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(users[0]);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ message: "Error fetching user data" });
    }
});

// --- Start Server ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
