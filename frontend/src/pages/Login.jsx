import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    // State for switching forms
    const [showRegister, setShowRegister] = useState(false);

    // Form fields state for register
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        age: '',
        wilaya: '',
        commune: '',
        gender: '',
        profileImage: null,
    });

    // Form fields state for login
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    // Other states
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (error || success) {
            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 200);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handlers for input changes
    const handleRegisterInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profileImage') {
            const file = files[0];
            setRegisterData((prev) => ({ ...prev, profileImage: file }));
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setImagePreview(reader.result);
                reader.readAsDataURL(file);
            } else {
                setImagePreview(null);
            }
        } else {
            setRegisterData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    // Submit handlers
    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const formData = new FormData();
            for (const key in registerData) {
                if (registerData[key]) {
                    formData.append(key, registerData[key]);
                }
            }

            const response = await fetch('http://localhost:3006/api/register', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (data.success) {
                setSuccess(data.message);
                setError('');
                setTimeout(() => {
                    setShowRegister(false);
                    setSuccess('Registered successfully! Please login.');
                    // Reset register form fields
                    setRegisterData({
                        username: '',
                        email: '',
                        password: '',
                        phoneNumber: '',
                        age: '',
                        wilaya: '',
                        commune: '',
                        gender: '',
                        profileImage: null,
                    });
                    setImagePreview(null);
                }, 500);
            } else {
                setError(data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('Cannot connect to server. Please check if the server is running.');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:3006/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                if (data.user.type === 'admin') {
                    window.location.href = 'http://localhost:3006/admin';


                    return;
                }

                setSuccess(data.message);
                localStorage.setItem('user', JSON.stringify(data.user));
                setTimeout(() => navigate('/'), 800);
            } else {
                setError(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Cannot connect to server. Please check if the server is running.');
        }

    };

    return (
        <div className="login-auth-container">
            {/* Dropdown user menu */}
            <div className="user-dropdown" ref={dropdownRef}>
                <div
                    id="loginText"
                    className="nav-hover-effect"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <i className="fas fa-user"></i>
                </div>
                <div className={`user-dropdown-content ${showDropdown ? 'show' : ''}`}>
                    <a href="#" className="dropdown-item"><i className="fas fa-user-circle"></i>Profile</a>
                    <a href="#" className="dropdown-item"><i className="fas fa-cog"></i>Settings</a>
                    <a href="#" className="dropdown-item"><i className="fas fa-globe"></i>Language</a>
                    <a href="#" className="dropdown-item"><i className="fas fa-bell"></i>Notifications</a>
                    <a href="#" className="dropdown-item"><i className="fas fa-question-circle"></i>Help</a>
                    <div className="dropdown-divider"></div>
                    <a href="#" className="dropdown-item"><i className="fas fa-sign-out-alt"></i>Logout</a>
                </div>
            </div>

            {/* Login form */}
            {!showRegister && (
                <div className="login-form-container">
                    <h2 className="login-title">Login</h2>
                    {error && <div className={`login-error ${isAnimating ? 'animating' : ''}`}>{error}</div>}
                    {success && <div className={`login-success ${isAnimating ? 'animating' : ''}`}>{success}</div>}
                    <form id="loginForm" className="login-form" onSubmit={handleLogin}>
                        <input
                            type="email"
                            name="email"
                            className="login-input"
                            placeholder="Email"
                            value={loginData.email}
                            onChange={handleLoginInputChange}
                            required
                        />
                        <div className="login-password-container">
                            <input
                                type="password"
                                name="password"
                                className="login-input"
                                placeholder="Password"
                                value={loginData.password}
                                onChange={handleLoginInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">Login</button>
                    </form>
                    <p className="login-switch-text">
                        Don't have an account?{' '}
                        <a
                            href="#"
                            className="login-link"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowRegister(true);
                                setError('');
                                setSuccess('');
                            }}
                        >
                            Register Now
                        </a>
                    </p>
                </div>
            )}

            {/* Register form */}
            {showRegister && (
                <div className="login-form-container">
                    <h2 className="login-title">Register</h2>
                    {error && <div className={`login-error ${isAnimating ? 'animating' : ''}`}>{error}</div>}
                    {success && <div className={`login-success ${isAnimating ? 'animating' : ''}`}>{success}</div>}
                    <form
                        id="registerForm"
                        className="login-form"
                        onSubmit={handleRegister}
                        encType="multipart/form-data"
                    >
                        <input
                            type="text"
                            name="username"
                            className="login-input"
                            placeholder="Full Name"
                            value={registerData.username}
                            onChange={handleRegisterInputChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            className="login-input"
                            placeholder="Email"
                            value={registerData.email}
                            onChange={handleRegisterInputChange}
                            required
                        />
                        <div className="login-password-container">
                            <input
                                type="password"
                                name="password"
                                className="login-input"
                                placeholder="Password"
                                value={registerData.password}
                                onChange={handleRegisterInputChange}
                                required
                            />
                        </div>
                        <input
                            type="tel"
                            name="phoneNumber"
                            className="login-input"
                            placeholder="Phone Number"
                            pattern="[0-9]{10}"
                            title="Please enter a valid 10-digit phone number"
                            value={registerData.phoneNumber}
                            onChange={handleRegisterInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="age"
                            className="login-input"
                            placeholder="Age"
                            value={registerData.age}
                            onChange={handleRegisterInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="wilaya"
                            className="login-input"
                            placeholder="State"
                            value={registerData.wilaya}
                            onChange={handleRegisterInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="commune"
                            className="login-input"
                            placeholder="City"
                            value={registerData.commune}
                            onChange={handleRegisterInputChange}
                            required
                        />
                        <select
                            name="gender"
                            className="login-select"
                            value={registerData.gender}
                            onChange={handleRegisterInputChange}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <div className="login-file-container">
                            <label htmlFor="profileImage" className="login-file-label">
                                Profile Picture
                            </label>
                            <input
                                type="file"
                                name="profileImage"
                                id="profileImage"
                                className="login-file-input"
                                accept="image/*"
                                onChange={handleRegisterInputChange}
                                required
                            />
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Profile Preview"
                                    className="login-image-preview"
                                    style={{ display: 'block' }}
                                />
                            )}
                        </div>
                        <button type="submit" className="login-button">
                            Register
                        </button>
                    </form>
                    <p className="login-switch-text">
                        Already have an account?{' '}
                        <a
                            href="#"
                            className="login-link"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowRegister(false);
                                setError('');
                                setSuccess('');
                            }}
                        >
                            Login
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
};

export default Login;
