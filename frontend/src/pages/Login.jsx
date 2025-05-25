import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (error || success) {
            setIsAnimating(true);
            const timer = setTimeout(() => {
                setIsAnimating(false);
            }, 500);
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
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('http://localhost:3006/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setSuccess(data.message);
                localStorage.setItem('user', JSON.stringify(data.user));
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                setError(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Cannot connect to server. Please check if the server is running.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const formData = new FormData();
        formData.append('username', document.getElementById('username').value);
        formData.append('email', document.getElementById('email').value);
        formData.append('password', document.getElementById('password').value);
        formData.append('phoneNumber', document.getElementById('phoneNumber').value);
        formData.append('age', document.getElementById('age').value);
        formData.append('wilaya', document.getElementById('wilaya').value);
        formData.append('commune', document.getElementById('commune').value);
        formData.append('gender', document.getElementById('gender').value);
        
        const profileImage = document.getElementById('profileImage').files[0];
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        try {
            const response = await fetch('http://localhost:3006/api/register', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(data.message);
                localStorage.setItem('user', JSON.stringify(data.user));
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                setError(data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('Cannot connect to server. Please check if the server is running.');
        }
    };

    return (
        <div className="login-auth-container">
            <div className="user-dropdown" ref={dropdownRef}>
                <div 
                    id="loginText" 
                    className="nav-hover-effect"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <i className="fas fa-user"></i>
                </div>
                <div className={`user-dropdown-content ${showDropdown ? 'show' : ''}`}>
                    <a href="#" className="dropdown-item">
                        <i className="fas fa-user-circle"></i>
                        Profile
                    </a>
                    <a href="#" className="dropdown-item">
                        <i className="fas fa-cog"></i>
                        Settings
                    </a>
                    <a href="#" className="dropdown-item">
                        <i className="fas fa-globe"></i>
                        Language
                    </a>
                    <a href="#" className="dropdown-item">
                        <i className="fas fa-bell"></i>
                        Notifications
                    </a>
                    <a href="#" className="dropdown-item">
                        <i className="fas fa-question-circle"></i>
                        Help
                    </a>
                    <div className="dropdown-divider"></div>
                    <a href="#" className="dropdown-item">
                        <i className="fas fa-sign-out-alt"></i>
                        Logout
                    </a>
                </div>
            </div>

            <div className="login-form-container" style={{ display: showRegister ? 'none' : 'block' }}>
                <h2 className="login-title">Login</h2>
                {error && <div className={`login-error ${isAnimating ? 'animating' : ''}`}>{error}</div>}
                {success && <div className={`login-success ${isAnimating ? 'animating' : ''}`}>{success}</div>}
                <form id="loginForm" className="login-form" onSubmit={handleLogin}>
                    <input type="email" id="loginEmail" className="login-input" placeholder="Email" required />
                    <div className="login-password-container">
                        <input type="password" id="loginPassword" className="login-input" placeholder="Password" required />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p className="login-switch-text">
                    Don't have an account? <a href="#" className="login-link" onClick={(e) => { e.preventDefault(); setShowRegister(true); }}>Register Now</a>
                </p>
            </div>

            <div className="login-form-container" style={{ display: showRegister ? 'block' : 'none' }}>
                <h2 className="login-title">Register</h2>
                {error && <div className={`login-error ${isAnimating ? 'animating' : ''}`}>{error}</div>}
                {success && <div className={`login-success ${isAnimating ? 'animating' : ''}`}>{success}</div>}
                <form id="registerForm" className="login-form" onSubmit={handleRegister} encType="multipart/form-data">
                    <input type="text" id="username" className="login-input" placeholder="Full Name" required />
                    <input type="email" id="email" className="login-input" placeholder="Email" required />
                    <div className="login-password-container">
                        <input type="password" id="password" className="login-input" placeholder="Password" required />
                    </div>
                    <input type="tel" id="phoneNumber" className="login-input" placeholder="Phone Number" pattern="[0-9]{10}" title="Please enter a valid 10-digit phone number" required />
                    <input type="number" id="age" className="login-input" placeholder="Age" required />
                    <input type="text" id="wilaya" className="login-input" placeholder="State" required />
                    <input type="text" id="commune" className="login-input" placeholder="City" required />
                    <select id="gender" className="login-select" required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <div className="login-file-container">
                        <label htmlFor="profileImage" className="login-file-label">Profile Picture</label>
                        <input 
                            type="file" 
                            id="profileImage" 
                            className="login-file-input"
                            accept="image/*" 
                            required 
                            onChange={handleImageChange}
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
                    <button type="submit" className="login-button">Register</button>
                </form>
                <p className="login-switch-text">
                    Already have an account? <a href="#" className="login-link" onClick={(e) => { e.preventDefault(); setShowRegister(false); }}>Login</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
