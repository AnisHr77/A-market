<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    // State for switching forms
    const [showRegister, setShowRegister] = useState(false);

    // إضافة ثوابت للصور الافتراضية
    const DEFAULT_MALE_IMAGE = 'https://i.pinimg.com/736x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg';
    const DEFAULT_FEMALE_IMAGE = 'https://i.pinimg.com/736x/a9/75/93/a975934bb378afc4ca8c133df451f56e.jpg';

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
        profile_image: DEFAULT_MALE_IMAGE // تعيين الصورة الافتراضية للذكور كقيمة أولية
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

    // إضافة حالة جديدة للتحكم في ظهور الصور
    const [showImages, setShowImages] = useState(false);

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
        const { name, value } = e.target;
        
        if (name === 'gender') {
            // تحديث الصورة المعاينة عند تغيير الجنس
            const defaultImageUrl = value === 'male' ? DEFAULT_MALE_IMAGE : DEFAULT_FEMALE_IMAGE;
            setImagePreview(defaultImageUrl);
            setRegisterData(prev => ({
                ...prev,
                [name]: value,
                profile_image: defaultImageUrl
            }));
        } else if (name === 'profile_image') {
            // تحديث الصورة عند اختيارها
            setImagePreview(value);
            setRegisterData(prev => ({
                ...prev,
                profile_image: value
            }));
            console.log('Selected profile image:', value); // للتأكد من الصورة المختارة
        } else {
            setRegisterData(prev => ({ ...prev, [name]: value }));
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

        // التحقق من البيانات المطلوبة
        if (!registerData.username || !registerData.email || !registerData.password || 
            !registerData.phoneNumber || !registerData.age || !registerData.wilaya || 
            !registerData.commune || !registerData.gender) {
            setError('Please fill in all required fields');
            return;
        }

        // تحديد الصورة الشخصية
        let profileImageUrl;
        if (registerData.profile_image && registerData.profile_image.trim() !== '') {
            // إذا تم إدخال رابط صورة، استخدمه
            profileImageUrl = registerData.profile_image.trim();
            console.log('Using custom profile image URL:', profileImageUrl);
        } else {
            // إذا لم يتم إدخال رابط، استخدم الصورة الافتراضية حسب الجنس
            profileImageUrl = registerData.gender === 'male' ? DEFAULT_MALE_IMAGE : DEFAULT_FEMALE_IMAGE;
            console.log('Using default profile image URL:', profileImageUrl);
        }

        try {
            // إنشاء كائن البيانات مع التأكد من وجود الصورة
            const userData = {
                username: registerData.username,
                email: registerData.email,
                password: registerData.password,
                phoneNumber: registerData.phoneNumber,
                age: registerData.age,
                wilaya: registerData.wilaya,
                commune: registerData.commune,
                gender: registerData.gender,
                profile_image: profileImageUrl
            };

            // طباعة البيانات للتأكد قبل الإرسال
            console.log('Sending registration data to server:', userData);

            const response = await fetch('http://localhost:4000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            console.log('Server response:', data);

            if (data.success) {
                console.log('Registration successful, user data:', data.user);
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
                        profile_image: DEFAULT_MALE_IMAGE
                    });
                    setImagePreview(null);
                    setShowImages(false);
                }, 500);
            } else {
                console.error('Registration failed:', data.message);
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
            const response = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setSuccess(data.message);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                setTimeout(() => {
                    if (data.user.type === 'admin') {
                        window.location.href = 'http://localhost:5000/';
                    } else {
                        window.location.href = 'http://localhost:7000/';
                    }
                }, 800);
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
                    <h2 className="login-title">Sign In</h2>
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
                        <button type="submit" className="login-button">Sign In</button>
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
                    >
                        <input
                            type="text"
                            name="username"
                            className="login-input"
                            placeholder="Full Name *"
                            value={registerData.username}
                            onChange={handleRegisterInputChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            className="login-input"
                            placeholder="Email *"
                            value={registerData.email}
                            onChange={handleRegisterInputChange}
                            required
                        />
                        <div className="login-password-container">
                            <input
                                type="password"
                                name="password"
                                className="login-input"
                                placeholder="Password *"
                                value={registerData.password}
                                onChange={handleRegisterInputChange}
                                required
                            />
                        </div>
                        <input
                            type="tel"
                            name="phoneNumber"
                            className="login-input"
                            placeholder="Phone Number *"
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
                            placeholder="Age *"
                            value={registerData.age}
                            onChange={handleRegisterInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="wilaya"
                            className="login-input"
                            placeholder="State *"
                            value={registerData.wilaya}
                            onChange={handleRegisterInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="commune"
                            className="login-input"
                            placeholder="City *"
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
                            <option value="">Select Gender *</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>

                        {/* إضافة حقل إدخال رابط الصورة الشخصية */}
                        <div className="profile-image-input-container">
                            <input
                                type="url"
                                name="profile_image"
                                className="login-input"
                                placeholder="Profile Image URL (Optional)"
                                value={registerData.profile_image}
                                onChange={handleRegisterInputChange}
                            />
                            <small className="profile-image-help">
                                Leave empty to use default image based on gender
                            </small>
                        </div>

                        <div className="profile-image-selection">
                            <button
                                type="button"
                                className="show-images-button"
                                onClick={() => setShowImages(!showImages)}
                            >
                                {showImages ? 'Hide Profile Images' : 'Choose Profile Image'}
                            </button>

                            {showImages && (
                                <div className="profile-image-options">
                                    <div className="profile-image-option">
                                        <input
                                            type="radio"
                                            name="profile_image"
                                            id="maleImage"
                                            value={DEFAULT_MALE_IMAGE}
                                            checked={registerData.profile_image === DEFAULT_MALE_IMAGE}
                                            onChange={handleRegisterInputChange}
                                        />
                                        <label htmlFor="maleImage" className="profile-image-option-label">
                                            <img
                                                src={DEFAULT_MALE_IMAGE}
                                                alt="Male Profile"
                                                className="profile-image-preview"
                                            />
                                            <span>Male Profile</span>
                                        </label>
                                    </div>
                                    <div className="profile-image-option">
                                        <input
                                            type="radio"
                                            name="profile_image"
                                            id="femaleImage"
                                            value={DEFAULT_FEMALE_IMAGE}
                                            checked={registerData.profile_image === DEFAULT_FEMALE_IMAGE}
                                            onChange={handleRegisterInputChange}
                                        />
                                        <label htmlFor="femaleImage" className="profile-image-option-label">
                                            <img
                                                src={DEFAULT_FEMALE_IMAGE}
                                                alt="Female Profile"
                                                className="profile-image-preview"
                                            />
                                            <span>Female Profile</span>
                                        </label>
                                    </div>
                                </div>
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
                            Sign In
                        </a>
                    </p>
                </div>
            )}

            {/* Add CSS styles */}
            <style jsx>{`
                .profile-image-input-container {
                    margin: 15px 0;
                }

                .profile-image-help {
                    display: block;
                    color: #666;
                    font-size: 12px;
                    margin-top: 5px;
                }

                .profile-image-input-container input {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    font-size: 14px;
                }

                .profile-image-input-container input:focus {
                    border-color: #007bff;
                    outline: none;
                    box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
                }

                .profile-image-selection {
                    margin: 15px 0;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }

                .show-images-button {
                    width: 100%;
                    padding: 10px;
                    background-color: #f8f9fa;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                    color: #333;
                    transition: all 0.3s ease;
                }

                .show-images-button:hover {
                    background-color: #e9ecef;
                    border-color: #007bff;
                }

                .profile-image-options {
                    display: flex;
                    gap: 20px;
                    justify-content: center;
                    margin-top: 15px;
                    animation: fadeIn 0.3s ease;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .profile-image-option {
                    position: relative;
                }

                .profile-image-option input[type="radio"] {
                    position: absolute;
                    opacity: 0;
                }

                .profile-image-option-label {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    cursor: pointer;
                    padding: 10px;
                    border: 2px solid transparent;
                    border-radius: 5px;
                    transition: all 0.3s ease;
                }

                .profile-image-option input[type="radio"]:checked + .profile-image-option-label {
                    border-color: #007bff;
                    background-color: #f8f9fa;
                }

                .profile-image-preview {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-bottom: 5px;
                }

                .profile-image-option span {
                    font-size: 14px;
                    color: #666;
                }
            `}</style>
        </div>
    );
};

export default Login;
=======
import React from 'react'
import Loginpage from '../Components/Login/LoginPage'
const Login = () => {
    return (
        <div>
            <Loginpage />

        </div>
    )
}
export default Login
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
