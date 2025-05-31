import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [storageData, setStorageData] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                // Store user information in localStorage
                const userData = {
                    user_id: data.user.user_id,
                    full_name: data.user.full_name,
                    gmail: data.user.gmail,
                    phone_number: data.user.phone_number,
                    age: data.user.age,
                    wilaya: data.user.wilaya,
                    commune: data.user.commune,
                    gender: data.user.gender,
                    profile_image: data.user.profile_image,
                    registration_date: data.user.registration_date,
                    type: data.user.type
                };

                // Store data in localStorage
                localStorage.setItem('infuser', JSON.stringify(userData));
                
                // Store login status
                localStorage.setItem('isLoggedIn', 'true');

                // Redirect based on user type
                if (data.user.type === 'admin') {
                    window.location.href = 'http://localhost:5000';
                } else {
                    navigate('/');
                }
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Server connection error');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    const checkLocalStorage = () => {
        const userData = localStorage.getItem('infuser');
        const loginStatus = localStorage.getItem('isLoggedIn');
        setStorageData({
            userData: userData ? JSON.parse(userData) : null,
            isLoggedIn: loginStatus
        });
    };

    // Check login status when page loads
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            const userData = JSON.parse(localStorage.getItem('infuser'));
            if (userData?.type === 'admin') {
                window.location.href = 'http://localhost:5000';
            } else {
                navigate('/');
            }
        }
    }, [navigate]);

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Sign In</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
                
                {/* Add button to check stored data */}
                <button 
                    onClick={checkLocalStorage}
                    style={{
                        marginTop: '10px',
                        backgroundColor: '#6c757d',
                        width: '100%'
                    }}
                >
                    Show Stored Data
                </button>

                {/* Display stored data */}
                {storageData && (
                    <div style={{
                        marginTop: '20px',
                        padding: '10px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '5px',
                        fontSize: '14px'
                    }}>
                        <h3>Local Storage Data:</h3>
                        <p>Login Status: {storageData.isLoggedIn}</p>
                        {storageData.userData && (
                            <div>
                                <h4>User Information:</h4>
                                <pre style={{ whiteSpace: 'pre-wrap' }}>
                                    {JSON.stringify(storageData.userData, null, 2)}
                                </pre>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
