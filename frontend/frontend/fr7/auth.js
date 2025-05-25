document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');
    const toggleRegisterPassword = document.getElementById('toggleRegisterPassword');
    const loginPassword = document.getElementById('loginPassword');
    const registerPassword = document.getElementById('password');

    // متغيرات لتتبع النقرات
    let loginClickCount = 0;
    let registerClickCount = 0;
    let loginClickTimer;
    let registerClickTimer;

    // هنا يتم التبديل بين login و register
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'block';
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
    });

    // وظيفة تبديل رؤية كلمة المرور
    function togglePasswordVisibility(input) {
        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    }

    // إضافة مستمعي الأحداث للنقر المزدوج
    loginPassword.addEventListener('click', () => {
        loginClickCount++;
        if (loginClickCount === 1) {
            loginClickTimer = setTimeout(() => {
                loginClickCount = 0;
            }, 300);
        } else if (loginClickCount === 2) {
            clearTimeout(loginClickTimer);
            loginClickCount = 0;
            togglePasswordVisibility(loginPassword);
        }
    });

    registerPassword.addEventListener('click', () => {
        registerClickCount++;
        if (registerClickCount === 1) {
            registerClickTimer = setTimeout(() => {
                registerClickCount = 0;
            }, 300);
        } else if (registerClickCount === 2) {
            clearTimeout(registerClickTimer);
            registerClickCount = 0;
            togglePasswordVisibility(registerPassword);
        }
    });

    // معاينة الصورة الشخصية
    document.getElementById('profileImage').addEventListener('change', function(e) {
        const file = e.target.files[0];
        const preview = document.getElementById('imagePreview');
        const previewText = document.getElementById('previewText');
        const placeholder = document.getElementById('uploadPlaceholder');
        
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.style.display = 'block';
                if (placeholder) placeholder.style.display = 'none';
                if (previewText) previewText.textContent = file.name;
            }
            reader.readAsDataURL(file);
        } else {
            preview.style.display = 'none';
            if (placeholder) placeholder.style.display = 'flex';
            if (previewText) previewText.textContent = '';
        }
    });

    // تسجيل الدخول
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('auth', 'true');
                localStorage.setItem('user', JSON.stringify({
                    id: data.user_id,
                    name: data.full_name,
                    email: data.gmail,
                    age: data.age,
                    wilaya: data.wilaya,
                    commune: data.commune,
                    gender: data.gender,
                    phone_number: data.phone_number,
                    profile_image: data.profile_image,
                    type: data.type,
                    registrationDate: data.registration_date
                }));

                // إنشاء رسالة النجاح
                const overlay = document.createElement('div');
                overlay.className = 'overlay';
                
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                
                if (data.type === 'admin') {
                successMessage.innerHTML = `
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="success-title">Login Successful</div>
                    <div class="success-text">Redirecting to dashboard...</div>
                `;
                document.body.appendChild(overlay);
                document.body.appendChild(successMessage);
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
                } else {
                    successMessage.innerHTML = `
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="success-title">Login Successful</div>
                    `;
                    document.body.appendChild(overlay);
                    document.body.appendChild(successMessage);
                    setTimeout(() => {
                        overlay.remove();
                        successMessage.remove();
                    }, 2000);
                }
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Server connection error');
        }
    });

    // تسجيل جديد
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const age = document.getElementById('age').value;
        const wilaya = document.getElementById('wilaya').value;
        const commune = document.getElementById('commune').value;
        const gender = document.getElementById('gender').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const profileImage = document.getElementById('profileImage').files[0];
        const userType = 'user'; // Set default type as 'user'

        // Create FormData for file upload
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('age', age);
        formData.append('wilaya', wilaya);
        formData.append('commune', commune);
        formData.append('gender', gender);
        formData.append('phoneNumber', phoneNumber);
        formData.append('userType', userType);
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            
            if (response.ok) {
                // Show success message
                const overlay = document.createElement('div');
                overlay.className = 'overlay';
                
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="success-title">Registration Successful</div>
                    <div class="success-text">Please login to continue...</div>
                `;
                
                document.body.appendChild(overlay);
                document.body.appendChild(successMessage);
                
                setTimeout(() => {
                    overlay.remove();
                    successMessage.remove();
                document.getElementById('login-form').style.display = 'block';
                document.getElementById('register-form').style.display = 'none';
                    document.getElementById('registerForm').reset();
                }, 2000);
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Server connection error');
        }
    });
});